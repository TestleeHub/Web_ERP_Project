import React, { Component, useState } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class orderForm extends Component{

    // 발주 입력
    orderForm = () => {
        this.props.history.push("/purchase/orderForm");
    }

    // 발주 목록 조회
    orderList = () => {
        this.props.history.push("/purchase/orderList");
    }

    // 구매 목록 조회
    purchaseList = () => {
        this.props.history.push("/purchase/purchaseList");
    }

    // 결제 중 목록 조회
    orderConfimING = () => {
        this.props.history.push("/purchase/orderConfimING");
    }

    // 미확인 목록 조회
    orderUnchecked = () => {
        this.props.history.push("/purchase/orderUnchecked");
    }

    // 확인 목록 조회
    orderChecked = () => {
        this.props.history.push("/purchase/orderChecked");
    }

    // 결제 완료 목록 조회
    orderConfirm = () => {
        this.props.history.push("/purchase/orderConfirm");
    }

    constructor(props) {
        super(props);
        this.state = {
            orderFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: []
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("orderFormData");
        console.log(data);
        if(data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('orderFormData');
        }
    }

    // 버튼 클릭시 발주서 디테일 행 추가
    addNewField = () => {
        this.setState(prevState => ({
            details: [
                ...prevState.details,
                {
                    materialId: "",
                    standard: "",
                    quantity: 0,
                    price: 0
                }
            ]
        }));
    }

    removeField = (index) => {
        this.setState(prevState => ({
            details: prevState.details.filter((_, i) => i !== index)
        }));
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
            "/purchase/orderForm",
            {
                orderFormId: this.state.orderFormId,
                customerId: this.state.customerId,
                employeeId: this.state.employeeId,
                dueDate: this.state.dueDate,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    render(){
        return(
            <div>
                <div>
                    <Typography style={style}>발주서 입력</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.orderForm}>전체</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfimING}>결제 중</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderUnchecked}>미확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderChecked}>확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfirm}>결제 완료</Button>
                </div>
                <div>
                    <Table style={{marginLeft: 15, width: '70%', backgroundColor:'#F5F5F5'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>발주코드</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="orderFormId" 
                                        value={this.state.orderFormId} 
                                        onChange={this.onChangeHandler} 
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell>거래처</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="customerId" 
                                        value={this.state.customerId} 
                                        placeholder="거래처코드" 
                                        onChange={this.onChangeHandler} 
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>납기일자</TableCell>
                                <TableCell>
                                    <input 
                                        type="date" 
                                        name="dueDate" 
                                        value={this.state.dueDate} 
                                        onChange={this.onChangeHandler} 
                                    />
                                </TableCell>
                                <TableCell>담당자</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="employeeId" 
                                        value={this.state.employeeId} 
                                        placeholder="담당자" 
                                        onChange={this.onChangeHandler} 
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={{marginLeft: 15, marginRight:5, backgroundColor: '#D3D3D3'}}>찾기</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}}>정렬</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.purchaseList}>주문</Button> 
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.orderList}>리스트</Button>
                </div>
                <div>
                    <Table style={{margin: 15}}>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">원재료코드</TableCell>
                                <TableCell align="center">규격</TableCell>
                                <TableCell align="center">수량</TableCell>
                                <TableCell align="center">단가</TableCell>
                                <TableCell align="center">적요</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.details.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input type="checkbox" /> {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].materialId`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.materialId}
                                        />
                                        <Button variant="outline-success">Search</Button>
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].standard`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.standard}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].quantity`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.quantity}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].price`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.price}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={() => this.removeField(index)}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.onSubmitAdd}>저장</Button>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.addNewField}>행 추가</Button>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}}>다시 작성</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default orderForm;

const style = {
    display:'flex',
    justifyContent:'left',
    margin: 15
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: '#D3D3D3',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

const trapezoidButtonF = {
    backgroundColor: '#D3D3D3',
    marginLeft: 15,
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}