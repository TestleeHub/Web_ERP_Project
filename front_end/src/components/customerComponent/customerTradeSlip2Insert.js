import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class customerTradeSlip2Insert extends Component{
    state = {
        slipId: "",
        tradeType: "출금",
        money: "",
        customerId: "",
        title: "",
        regDate: "",
        openDialog: false
    }

    // 입력 성공 후 "거래처 출금 목록" 페이지로 이동
    handleCloseDialog = () => {
        this.setState({ openDialog: false });
        this.props.history.push("/customer/customerTradeSlip2"); // "거래처 출금 목록" 페이지 경로
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
                this.setState({ openDialog: true });
            }).catch((error) => {
                console.log('error : ', error);
            })

    }

    // 거래처 출금 목록 페이지로 이동 함수
    goToCustomerTradeSlip2 = () => {
        this.props.history.push("/customer/customerTradeSlip2");
    }

    render(){
        return(
            <div>
                <br />
                <Typography variant="h4" style={style}> 거래처 출금 처리 </Typography>
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
                                    readOnly
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
                                    value="출금"
                                    readOnly
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
                                    value={this.state.customerId}
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
                <Button variant="contained" style={normalButton} onClick={this.goToCustomerTradeSlip2}>목록</Button>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                >
                    <DialogTitle>알림</DialogTitle>
                    <DialogContent>
                        저장되었습니다.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default withRouter(customerTradeSlip2Insert);