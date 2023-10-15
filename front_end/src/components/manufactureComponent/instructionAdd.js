import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class instructionAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workOrderId: "",
            customerId: "",
            managerId: "",
            name: "",
            standard: "",
            quantity: "",
            completion: "",
            storageId: "",
            validation: "",
            dueDate: "",
            productionItemId: "",
            registDate: ""
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("workOrderData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('workOrderData');
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
            "/manufacture/instructionAdd",
            {
                workOrderId: this.state.workOrderId,
                customerId: this.state.customerId,
                managerId: this.state.managerId,
                name: this.state.name,
                standard: this.state.standard,
                quantity: this.state.quantity,
                storageId: this.state.storageId,
                dueDate: this.state.dueDate,
                productionItemId: this.state.productionItemId,
            }).then((response) => {
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })

    }

    render() {
        return (

            <div>
                <br />
                <Typography variant="h4" style={style}> 작업지시서 등록 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 작업지시서 코드 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="workOrderId"
                                    placeholder="지시서 코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.workOrderId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>거래처</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="customerId"
                                    placeholder="거래처"
                                    onChange={this.onChangeHandler}
                                    value={this.state.customerId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>담당자</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="managerId"
                                    placeholder="담당자"
                                    onChange={this.onChangeHandler}
                                    value={this.state.managerId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>지시서 명</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="name"
                                    placeholder="지시서 명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>수량</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="quantity"
                                    placeholder="수량"
                                    onChange={this.onChangeHandler}
                                    value={this.state.quantity}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>규격</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="standard"
                                    placeholder="규격"
                                    onChange={this.onChangeHandler}
                                    value={this.state.standard}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>받는창고</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="storageId"
                                    placeholder="받는창고"
                                    onChange={this.onChangeHandler}
                                    value={this.state.storageId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>납기일</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="date"
                                    size="70"
                                    name="dueDate"
                                    placeholder="납기일"
                                    onChange={this.onChangeHandler}
                                    value={this.state.dueDate}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>생산품</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="productionItemId"
                                    placeholder="생산품"
                                    onChange={this.onChangeHandler}
                                    value={this.state.productionItemId}
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
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

export default instructionAdd;