import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";
import CustomerPopup from "../popUp/customerPopup";
import ProductionPopup from "../popUp/productionPopup";
import EmployeePopup from "../popUp/employeePopup";
import StoragePopup from "../popUp/storagePopup";
import Modal from 'react-modal';

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
            registDate: "",
            isCustomerPopupOpen: false,
            isProductionPopupOpen: false,
            isEmployeePopupOpen: false,
            isStoregePopupOpen: false
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
    // 팝업 열기
    openProductionPopup = () => {
        this.setState({ isProductionPopupOpen: true });
    }
    openCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: true });
    }
    openEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: true });
    }
    openStoregePopup = () => {
        this.setState({ isStoregePopupOpen: true });
    }

    // 팝업 닫기
    closeProductionPopup = () => {
        this.setState({ isProductionPopupOpen: false });
    }
    closeCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: false });
    }
    closeEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: false });
    }
    closeStoregePopup = () => {
        this.setState({ isStoregePopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleProductionPopupData = (data) => {
        this.setState({ productionItemId: data.productionItemId, isProductionPopupOpen: false });
    }
    handleCustomerPopupData = (data) => {
        this.setState({ customerId: data.customerId, isCustomerPopupOpen: false });
    }
    handleEmployeePopupData = (data) => {
        this.setState({ managerId: data.employeeId, isEmployeePopupOpen: false });
    }
    handleStoregePopupData = (data) => {
        this.setState({ storageId: data.storageId, isStoregePopupOpen: false });
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
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/manufacture/instructionList');
            }).catch((error) => {
                alert("등록에 실패하였습니다.!")
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })

    }

    render() {
        return (

            <div>
                {/* 팝업 */}
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
                                width: '700px', // 원하는 폭으로 설정
                                height: '400px', // 원하는 높이로 설정
                                top: '50%', // 원하는 수직 위치로 설정
                                left: '55%', // 원하는 수평 위치로 설정
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <EmployeePopup onPopupData={this.handleEmployeePopupData} />

                        <button onClick={this.closeEmployeePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isStoregePopupOpen}
                        onRequestClose={this.closeStoregePopup}
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
                        <StoragePopup onPopupData={this.handleStoregePopupData} />

                        <button onClick={this.closeStoregePopup}>닫기</button>
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
                    <Modal
                        isOpen={this.state.isCustomerPopupOpen}
                        onRequestClose={this.closeCustomerPopup}
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
                        <CustomerPopup onPopupData={this.handleCustomerPopupData} />

                        <button onClick={this.closeCustomerPopup}>닫기</button>
                    </Modal>
                </div>
                {/* 팝업 끝 */}
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
                                    placeholder="거래처(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openCustomerPopup}
                                    value={this.state.customerId}
                                    readOnly
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
                                    placeholder="담당자(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openEmployeePopup}
                                    value={this.state.managerId}
                                    readOnly
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
                                    placeholder="받는창고(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openStoregePopup}
                                    value={this.state.storageId}
                                    readOnly
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
                                    placeholder="생산품(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openProductionPopup}
                                    value={this.state.productionItemId}
                                    readOnly
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