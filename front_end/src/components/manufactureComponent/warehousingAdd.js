import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";
import ProductionPopup from "../popUp/productionPopup";
import InstructionPopup from "../popUp/instructionPopup";
import CustomerPopup from "../popUp/customerPopup";
import MaterialPopup from "../popUp/materialPopup";
import Modal from 'react-modal';

class warehousingAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materialReciveId: "",
            productionItemId: "",
            workOrderId: "",
            businessRelationId: "",
            details: [],
            isProductionPopupOpen: false,
            isInstructionPopupOpen: false,
            isCustomerPopupOpen: false,
            isMaterialPopupOpen: false,
            detailIndex: -1
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("warehousingData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('warehousingData');
        }
    }

    // 팝업 열기
    openProductionPopup = () => {
        this.setState({ isProductionPopupOpen: true });
    }
    openInstructionPopup = () => {
        this.setState({ isInstructionPopupOpen: true });
    }
    openCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: true });
    }
    openMaterialPopup = (detailIndex) => {
        this.setState({ isMaterialPopupOpen: true, detailIndex: detailIndex });
    }

    // 팝업 닫기
    closeProductionPopup = () => {
        this.setState({ isProductionPopupOpen: false });
    }
    closeInstructionPopup = () => {
        this.setState({ isInstructionPopupOpen: false });
    }
    closeCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: false });
    }
    closeMaterialPopup = () => {
        this.setState({ isMaterialPopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleProductionPopupData = (data) => {
        this.setState({ productionItemId: data.productionItemId, isProductionPopupOpen: false });
    }
    handleInstructionPopupData = (data) => {
        this.setState({ workOrderId: data.workOrderId, isInstructionPopupOpen: false });
    }
    handleCustomerPopupData = (data) => {
        this.setState({ businessRelationId: data.customerId, isCustomerPopupOpen: false });
    }
    handleMaterialPopupData = (data) => {
        const updatedDetails = [...this.state.details]; // details 배열 복사
        updatedDetails[this.state.detailIndex].materialId = data.materialId; // 속성 업데이트
        updatedDetails[this.state.detailIndex].name = data.name; // 속성 업데이트
        updatedDetails[this.state.detailIndex].storageId = data.storageId; // 속성 업데이트
        this.setState({ details: updatedDetails, isMaterialPopupOpen: false }); // 상태 업데이트
    }

    addNewField = () => {
        this.setState(prevState => ({
            details: [
                ...prevState.details,
                {
                    materialId: "",
                    name: "",
                    storageId: "",
                    quantity: 0
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
            "/manufacture/warehousingAdd",
            {
                materialReciveId: this.state.materialReciveId,
                productionItemId: this.state.productionItemId,
                workOrderId: this.state.workOrderId,
                businessRelationId: this.state.businessRelationId,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/manufacture/warehousingList');
            }).catch((error) => {
                alert("등록에 실패하였습니다.!")
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })

    }

    onReset = () => {

        this.setState({
            materialReciveId: "",
            productionItemId: "",
            workOrderId: "",
            businessRelationId: "",
            details: [],
            isProductionPopupOpen: false,
            isInstructionPopupOpen: false,
            isCustomerPopupOpen: false,
            isMaterialPopupOpen: false,
            detailIndex: -1
        });
    }

    render() {
        return (
            <div>
                {/* 팝업 */}
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
                        isOpen={this.state.isInstructionPopupOpen}
                        onRequestClose={this.closeInstructionPopup}
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
                        <InstructionPopup onPopupData={this.handleInstructionPopupData} />

                        <button onClick={this.closeInstructionPopup}>닫기</button>
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
                {/* 팝업 끝 */}

                <br />
                <Typography variant="h4" style={style}> 생산 입고 등록 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>입고입력</Button>
                </div>
                <Table style={{ borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }} >생산 입고 코드 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    name="materialReciveId"
                                    size="10"
                                    placeholder="생산 불출 코드"
                                    onChange={this.onChangeHandler}
                                    readOnly
                                    value={this.state.materialReciveId}
                                />
                            </TableCell>
                            <TableCell style={{ border: 'none' }}>생산 품목 코드</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    name="productionItemId"
                                    size="10"
                                    placeholder="생산 품목 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openProductionPopup}
                                    readOnly
                                    value={this.state.productionItemId} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>작업 지시서 코드</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    name="workOrderId"
                                    size="10"
                                    placeholder="작업 지시서 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openInstructionPopup}
                                    readOnly
                                    value={this.state.workOrderId} /></TableCell>
                            <TableCell style={{ border: 'none' }}>거래처 코드</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    name="businessRelationId"
                                    size="10"
                                    placeholder="거래처 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openCustomerPopup}
                                    readOnly
                                    value={this.state.businessRelationId}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>찾기(F3)</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>정렬</Button>

                <br /><br />

                <Table style={{ borderRight: '1px solid lightgray' }}>
                    <TableHead style={{ backgroundColor: 'lightgray' }}>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>  </TableCell>
                            <TableCell> 원자재 코드 </TableCell>
                            <TableCell> 원자재 이름 </TableCell>
                            <TableCell> 창고코드 </TableCell>
                            <TableCell> 수량 </TableCell>
                            <TableCell> 새로운 항목 추가 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.details.map((detail, index) => (
                            <TableRow key={index} style={{ backgroundColor: 'ghostwhite' }}>
                                <TableCell style={{ backgroundColor: 'lightgray' }}> {index + 1} </TableCell>
                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                    <input
                                        type="text"
                                        name={`details[${index}].materialId`}
                                        size="10"
                                        placeholder="원자재 코드(검색)"
                                        onChange={this.onChangeHandler}
                                        onClick={() => this.openMaterialPopup(index)}
                                        readOnly
                                        value={detail.materialId}
                                    />
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                    <input
                                        type="text"
                                        name={`details[${index}].name`}
                                        size="10"
                                        placeholder="원자재 이름"
                                        onChange={this.onChangeHandler}
                                        readOnly
                                        value={detail.name}
                                    />
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                    <input
                                        type="text"
                                        name={`details[${index}].storageId`}
                                        size="10"
                                        placeholder="창고코드"
                                        onChange={this.onChangeHandler}
                                        readOnly
                                        value={detail.storageId}
                                    />
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                    <input
                                        type="text"
                                        name={`details[${index}].quantity`}
                                        size="10"
                                        placeholder="수량"
                                        onChange={this.onChangeHandler}
                                        value={detail.quantity}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" style={normalButton} onClick={() => this.removeField(index)}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <br />

                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.addNewField}>항목 추가</Button>
                <Button variant="contained" style={normalButton} onClick={this.onReset}>초기화</Button>
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

export default warehousingAdd;