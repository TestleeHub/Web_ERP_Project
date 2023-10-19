import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import CustomerPopup from "../popUp/customerPopup";
import EmployeePopup from "../popUp/employeePopup";
import ProductionPopup from "../popUp/productionPopup";
import Modal from "react-modal";

class salesForm_Form extends Component{

    // 주문 입력
    salesForm_Form = () => {
        this.props.history.push("/purchase/salesForm_Form");
    }

    // 주문 목록 조회
    salesForm_List = () => {
        this.props.history.push("/purchase/salesForm_List");
    }

    // 판매 목록 조회
    salesList = () => {
        this.props.history.push("/purchase/salesList");
    }

    constructor(props) {
        super(props);
        this.state = {
            salesFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isCustomerPopupOpen: false,
            isEmployeePopupOpen: false,
            isProductionPopupOpen: false,
            detailIndex: -1
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("salesFormData");
        console.log(data);
        if(data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem("salesFormData");
        }
    }

    // 팝업 열기
    openCustomerPopup = () => {
        this.setState({isCustomerPopupOpen: true})
    }
    openEmployeePopup = () => {
        this.setState({isEmployeePopupOpen: true})
    }
    openProductionPopup = (detailIndex) => {
        this.setState({isProductionPopupOpen: true, detailIndex: detailIndex})
    }

    // 팝업 닫기
    closeCustomerPopup = () => {
        this.setState({isCustomerPopupOpen: false})
    }
    closeEmployeePopup = () => {
        this.setState({isEmployeePopupOpen: false})
    }
    closeProductionPopup = () => {
        this.setState({isProductionPopupOpen: false})
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleCustomerPopupData = (data) => {
        this.setState({customerId : data.customerId, isCustomerPopupOpen: false})
    }
    handleEmployeePopupData = (data) => {
        this.setState({employeeId : data.employeeId, isEmployeePopupOpen: false})
    }
    handleProductionPopupData = (data) => {
        const updatedDetails = [...this.state.details]; // details 배열 복사
        updatedDetails[this.state.detailIndex].productionItemId = data.productionItemId; // 속성 업데이트
        updatedDetails[this.state.detailIndex].standard = data.standard; // 속성 업데이트
        this.setState({ details: updatedDetails, isProductionPopupOpen: false }); // 상태 업데이트
    }

    // 버튼 클릭시 주문서 디테일 행 추가
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
    };

    // 버튼 클릭시 주문서 디테일 행 삭제
    removeField = (index) => {
        this.setState(prevState => ({
            details: prevState.details.filter((_, i) => i !== index)
        }));
    };

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
    }

    // 추가 요청
    onSubmitAdd = (e) => {
        e.preventDefault();
        if (!this.state.customerId || !this.state.employeeId || !this.state.dueDate || this.state.details.length === 0) {
            console.log(this.state.salesFormId)
            console.log(this.state.customerId)
            console.log(this.state.employeeId)
            console.log(this.state.dueDate)
            console.log(this.state.details.length)
            alert('저장 실패');
            return;
        }
        request(
            "POST",
            "/purchase/salesForm_Form",
            {
                salesFormId: this.state.salesFormId,
                customerId: this.state.customerId,
                employeeId: this.state.employeeId,
                dueDate: this.state.dueDate,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
                alert('저장되었습니다. 주문 목록으로 이동합니다.')
                this.props.history.push('/purchase/salesForm_List');
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    onReset = () => {
        this.setState({
            salesFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isCustomerPopupOpen: false,
            isEmployeePopupOpen: false,
            isProductionPopupOpen: false,
            detailIndex: -1
        });
    }

    render(){
        return(
            <div>
                <div>
                <Modal
                        isOpen={this.state.isCustomerPopupOpen}
                        onRequestClose = {this.closeCustomerPopup}
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
                        <CustomerPopup onPopupData={this.handleCustomerPopupData} />
                        <br/>
                        <button onClick={this.closeCustomerPopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isEmployeePopupOpen}
                        onRequestClose = {this.closeEmployeePopup}
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
                        <EmployeePopup onPopupData={this.handleEmployeePopupData} />
                        <br/>
                        <button onClick={this.closeEmployeePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isProductionPopupOpen}
                        onRequestClose={this.closeProductionPopup}
                        contentLabel="팝업"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '700px', // 원하는 폭으로 설정
                                height: '400px', // 원하는 높이로 설정
                                top: '50%', // 원하는 수직 위치로 설정
                                left: '55%', // 원하는 수평 위치로 설정
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <ProductionPopup onPopupData={this.handleProductionPopupData} />

                        <button onClick={this.closeProductionPopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Typography variant="h4" style={style}>주문서 입력</Typography>
                </div>
                <div>
                <Button variant="contained" style={trapezoidButton} onClick={this.salesForm_Form}>주문서 입력</Button>
                </div>
                <div>
                    <Table style={{ marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>주문 코드</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input 
                                        type="text"
                                        name="salesFormId"
                                        value={this.state.salesFormId}
                                        onChange={this.onChangeHandler}
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>거래처</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input 
                                        type="text" 
                                        name="customerId" 
                                        value={this.state.customerId} 
                                        placeholder="거래처코드" 
                                        onChange={this.onChangeHandler} 
                                        onClick={this.openCustomerPopup}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>납기 일자</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input 
                                        type="date" 
                                        name="dueDate" 
                                        value={this.state.dueDate} 
                                        onChange={this.onChangeHandler} 
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>담당자</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input 
                                        type="text" 
                                        name="employeeId" 
                                        value={this.state.employeeId} 
                                        placeholder="담당자" 
                                        onChange={this.onChangeHandler} 
                                        onClick={this.openEmployeePopup}
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={normalButton}>찾기</Button>
                    <Button variant="outline-success" style={normalButton} onClick={this.salesForm_List}>주문 목록</Button>
                    <Button variant="outline-success" style={normalButton} onClick={this.salesList}>판매 목록</Button>
                </div>
                <div>
                    <Table style={{ marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{borderBottomStyle: '1px solid lightgray'}}>
                            <TableRow>
                                <TableCell style={{ border: 'none' }} align="center">
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">품목코드</TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">규격</TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">수량</TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">단가</TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">행 삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.details.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input
                                            type="text"
                                            name={`details[${index}].productionItemId`}
                                            size="10"
                                            placeholder="품목코드(검색)"
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openProductionPopup(index)}
                                            value={detail.productionItemId}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input
                                            type="text"
                                            name={`details[${index}].standard`}
                                            size="10"
                                            placeholder="규격(검색)"
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openProductionPopup(index)}
                                            value={detail.standard}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input 
                                            type="text"
                                            name={`details[${index}].quantity`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.quantity}
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input 
                                            type="text"
                                            name={`details[${index}].price`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.price}
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <Button variant="contained" style={normalButton} onClick={() => this.removeField(index)}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Button variant="outline-success" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                        <Button variant="outline-success" style={normalButton} onClick={this.addNewField}>행 추가</Button>
                        <Button variant="outline-success" style={normalButton} onClick={this.onReset}>다시 작성</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default salesForm_Form;

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '40px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}