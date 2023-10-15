import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import Modal from 'react-modal';
import Popup from "../popUp/salesPopup";

class salesForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            salesId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isPopupOpen: false
        }
    }

     // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
     componentDidMount() {
        const data = window.localStorage.getItem("salesData");
        console.log(data);
        if(data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('salesData');
        }
    }

    // 팝업 열기
    openPopup = () => {
        this.setState({ isPopupOpen: true });
    }

    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handlePopupData = (data) => {
        this.setState({ customerId: data.customerId, isPopupOpen: false });
        this.setState({ employeeId: data.employeeId, isPopupOpen: false });
    }

    // 버튼 클릭시 구매 디테일 행 추가
    addNewField = () => {
        this.setState(prevState => ({
            details: [
                ...prevState.details,
                {
                    productionItemId: "",
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
            "/purchase/salesForm",
            {
                salesFormId: this.state.salesFormId,
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
                {/* 팝업 */}
                <div>
                    <Modal
                        isOpen={this.state.isPopupOpen}
                        onRequestClose={this.closePopup}
                        contentLabel="팝업"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '700px', 
                                height: '400px', 
                                top: '50%',
                                left: '55%',
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <Popup onPopupData={this.handlePopupData} />

                        <button onClick={this.closePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Typography style={style}>판매 입력</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.salesForm}>판매 입력</Button>
                </div>
                <div>
                    <Table style={{marginLeft: 15, width: '80%', backgroundColor:'#F5F5F5'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>판매코드</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="salesId" 
                                        value={this.state.salesId} 
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
                                        onClick={this.openPopup} 
                                        readOnly
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
                                        onClick={this.openPopup} 
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={{marginLeft: 15, marginRight:5, backgroundColor: '#D3D3D3'}}>찾기</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}}>정렬</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.salesForm_List}>주문</Button> 
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.salesForm}>리스트</Button>
                </div>
                <div>
                    <Table style={{margin: 15}}>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">품목코드</TableCell>
                                <TableCell align="center">규격</TableCell>
                                <TableCell align="center">수량</TableCell>
                                <TableCell align="center">단가</TableCell>
                                <TableCell align="center">행 삭제</TableCell>
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
                                            name={`details[${index}].productionItemId`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.productionItemId}
                                        />
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

export default salesForm;

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