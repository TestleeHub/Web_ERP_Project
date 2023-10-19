import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class customerTradeSlipInsert extends Component{
    state = {
        slipId: "",
        tradeType: "",
        money: "",
        customerId: "",
        title: "",
        regDate: ""
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("tradeSlipData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('tradeSlipData');
        }
    }

    // 필드의 업데이트 값을 state에 저장
    updateField = (fieldName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name.startsWith("details[")) {
            const parts = name.match(/details\[(\d+)\]\.(\w+)/);
            if (parts && parts.length === 3) {
                const index = parseInt(parts[1]);
                const field = parts[2];
                this.setState(prevState => ({
                    ...prevState,
                    details: prevState.details.map((detail, i) => {
                        if (i === index) {
                            return { ...detail, [field]: value };
                        }
                        return detail;
                    })
                }));
            }
        } else {
            this.updateField(name, value); // 다른 필드 업데이트
        }
    };

    // 추가 요청
    onSubmitAdd = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/customer/tradeSlipAdd",
            {
                slipId: this.state.slipId,
                tradeType: this.state.tradeType,
                money: this.state.money,
                customerId: this.state.customerId,
                title: this.state.title
            }).then((response) => {
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })

    }
    
    render(){
        return(
            <div>
                <br />
                <Typography variant="h4" style={style}> 거래처 입금 처리 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 전표번호 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="slipId"
                                    placeholder="전표번호"
                                    onChange={this.onChangeHandler}
                                    value={this.state.slipId}
                                    readOnly   // 임시로 이렇게 지정
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 거래유형 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="tradeType"
                                    placeholder="거래유형"
                                    onChange={this.onChangeHandler}
                                    value={this.state.tradeType}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 금액 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="money"
                                    placeholder="금액"
                                    onChange={this.onChangeHandler}
                                    value={this.state.money}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 거래처코드 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="customerId"
                                    placeholder="거래처코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.customerId}  // FK인 customerId를 반영하려면? - 임시로 이렇게 지정
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 제목 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="title"
                                    placeholder="제목"
                                    onChange={this.onChangeHandler}
                                    value={this.state.title}  //
                                />
                            </TableCell>
                        </TableRow>	
                        
                    </TableHead>
                </Table>
                <br />
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '30px',
    padding: '10px 20px'
}

export default customerTradeSlipInsert;