import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import CustomerPopup from "../popUp/customerPopup";
import EmployeePopup from "../popUp/employeePopup";
import MaterialPopup from "../popUp/materialPopup";
import Modal from "react-modal";

class orderForm extends Component {

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

    constructor(props) {
        super(props);
        this.state = {
            orderFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isCustomerPopupOpen: false,
            isEmployeePopupOpen: false,
            isMaterialPopupOpen: false,
            detailIndex: -1
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("orderFormData");
        console.log(data);
        if (data != null) {
            // 반환된 데이터는 주로 JSON 형태의 문자열이므로, 이를 JavaScript 객체로 변환하기 위해 JSON.parse()를 사용할 수 있습니다.
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('orderFormData');
        }
    }

    // 팝업 열기
    openCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: true })
    }
    openEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: true })
    }
    openMaterialPopup = (detailIndex) => {
        this.setState({ isMaterialPopupOpen: true, detailIndex: detailIndex })
    }

    // 팝업 닫기
    closeCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: false })
    }
    closeEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: false })
    }
    closeMaterialPopup = () => {
        this.setState({ isMaterialPopupOpen: false })
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleCustomerPopupData = (data) => {
        this.setState({ customerId: data.customerId, isCustomerPopupOpen: false })
    }
    handleEmployeePopupData = (data) => {
        this.setState({ employeeId: data.employeeId, isEmployeePopupOpen: false })
    }
    handleMaterialPopupData = (data) => {
        const updatedDetails = [...this.state.details]; // details 배열 복사
        updatedDetails[this.state.detailIndex].materialId = data.materialId; // 속성 업데이트
        this.setState({ details: updatedDetails, isMaterialPopupOpen: false }); // 상태 업데이트
    }

    // 버튼 클릭시 발주서 디테일 행 추가
    addNewField = () => {
        this.setState(prevState => ({
            details: [
                ...prevState.details,
                {
                    materialId: "",
                    standard: "",
                    quantity: "",
                    price: ""
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
        if (!this.state.customerId || !this.state.employeeId || !this.state.dueDate || this.state.details.length === 0) {
            alert('저장 실패');
            return;
        }
        
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
                alert('저장되었습니다. 발주 목록으로 이동합니다.')
                this.props.history.push('/purchase/orderList');
            }).catch((error) => {
                console.log('error : ', error);
                if (error.response.status === 403) {
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    onReset = () => {
        this.setState({
            orderFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isCustomerPopupOpen: false,
            isEmployeePopupOpen: false,
            isMaterialPopupOpen: false,
            detailIndex: -1
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Modal
                        isOpen={this.state.isCustomerPopupOpen}
                        onRequestClose={this.closeCustomerPopup}
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
                        <br />
                        <button onClick={this.closeCustomerPopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isEmployeePopupOpen}
                        onRequestClose={this.closeEmployeePopup}
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
                        <br />
                        <button onClick={this.closeEmployeePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isMaterialPopupOpen}
                        onRequestClose={this.closeMaterialPopup}
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
                        <MaterialPopup onPopupData={this.handleMaterialPopupData} />

                        <button onClick={this.closeMaterialPopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Typography variant="h4" style={style}>발주서 입력</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderForm}>발주 입력</Button>
                </div>
                <div>
                    <Table style={{ marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>발주 코드</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="orderFormId"
                                        value={this.state.orderFormId}
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
                                        readOnly
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
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={normalButton} onClick={this.orderList}>발주 목록</Button>
                    <Button variant="outline-success" style={normalButton} onClick={this.purchaseList}>구매 목록</Button>
                </div>
                <div>
                    <Table style={{ marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{borderBottomStyle: '1px solid lightgray'}}>
                            <TableRow>
                                <TableCell style={{ border: 'none' }} align="center">
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }} align="center">원재료코드</TableCell>
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
                                            name={`details[${index}].materialId`}
                                            size="10"
                                            placeholder="원자재 코드(검색)"
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openMaterialPopup(index)}
                                            value={detail.materialId}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input
                                            type="text"
                                            name={`details[${index}].standard`}
                                            size="10"
                                            placeholder="규격(입력)"
                                            onChange={this.onChangeHandler}
                                            value={detail.standard}
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

export default orderForm;