import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead, deprecatedPropType } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import Modal from 'react-modal';
import Popup from "../popUp/purchasePopup";
import D_Popup from "../popUp/purchaseDPopup";

class purchaseForm extends Component {

    // 발주 목록 조회
    orderList = () => {
        this.props.history.push("/purchase/orderList");
    }

    // 구매 목록 조회
    purchaseList = () => {
        this.props.history.push("/purchase/purchaseList");
    }

    // 구매 입력
    purchaseForm = () => {
        this.props.history.push("/purchase/purchaseForm");
    }

    constructor(props) {
        super(props);
        this.state = {
            purchaseId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isPopupOpen: false,
            isD_PopupOpen: false,
            detailIndex: -1 // -1은 유효한 인덱스가 아니라는 의미
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("purchaseFormData");
        console.log(data);
        if (data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('purchaseFormData');
        }
    }

    // 팝업 열기
    openPopup = () => {
        this.setState({ isPopupOpen: true });
    }
    openD_Popup = (detailIndex) => {
        this.setState({isD_PopupOpen: true, detailIndex: detailIndex})
    }
    // openD_Popup = () => {
    //     this.setState({ isD_PopupOpen: true });
    // }

    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }
    closeD_Popup = () => {
        this.setState({ isD_PopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handlePopupData = (data) => {
        this.setState({ customerId: data.customerId, isPopupOpen: false });
        this.setState({ employeeId: data.employeeId, isPopupOpen: false });
    }
    handleD_PopupDdata = (data) => {
        this.setState(prevState => {
            // details 배열 복사
            const newDetails = [];

            for (let detailData of data.details) {
                // 새로운 detail 항목 생성
                const newDetail = {
                    materialId: detailData.materialId,
                    standard: detailData.standard
                };
                // details 배열에 새 항목 추가
                newDetails.push(newDetail);
            }

            return {
                ...prevState,
                details: newDetails,
                isD_PopupOpen: false
            };
        });
    };


    // 버튼 클릭시 구매 디테일 행 추가
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
        if (!this.state.customerId || !this.state.employeeId || !this.state.dueDate || this.state.details.length === 0) {
            alert('저장 실패');
            return;
        }
        request(
            "POST",
            "/purchase/purchaseForm",
            {
                purcahseId: this.state.purchaseId,
                customerId: this.state.customerId,
                employeeId: this.state.employeeId,
                dueDate: this.state.dueDate,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
                alert('저장되었습니다. 구매 목록으로 이동합니다.')
                this.props.history.push('/purchase/purchaseList');
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
            purchaseId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isPopupOpen: false,
            isD_PopupOpen: false,
            detailIndex: -1
        });
    }

    render() {
        return (
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
                        <br />
                        <button onClick={this.closePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isD_PopupOpen}
                        onRequestClose={this.closeD_Popup}
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
                        <D_Popup onD_PopupData={this.handleD_PopupDdata} />
                        <br />
                        <button onClick={this.closeD_Popup}>닫기</button>
                    </Modal>
                </div>

                <div>
                    <Typography variant="h4" style={style}>구매 입력</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.purchaseForm}>구매 입력</Button>
                </div>
                <div>
                    <Table style={{marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>구매 코드</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="purchaseId"
                                        value={this.state.purchaseId}
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
                                        onClick={this.openPopup}
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
                                        onClick={this.openPopup}
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={normalButton}>찾기</Button>
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
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openD_Popup(index)}
                                            value={detail.materialId}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell style={{ border: 'none' }} align="center">
                                        <input
                                            type="text"
                                            name={`details[${index}].standard`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openD_Popup(index)}
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

export default purchaseForm;

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