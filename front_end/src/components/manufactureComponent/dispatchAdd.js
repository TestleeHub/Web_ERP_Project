import React, { Component } from "react";
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";
import ProductionPopup from "../popUp/productionPopup";
import InstructionPopup from "../popUp/instructionPopup";
import CustomerPopup from "../popUp/customerPopup";
import MaterialPopup from "../popUp/materialPopup";
import Modal from 'react-modal';

class dispatchAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materialReleaseId: "",
            productionItemId: "",
            workOrderId: "",
            businessRelationId: "",
            details: [],
            isPopupOpen: false,
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("dispatchData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('dispatchData');
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
        this.setState({ workOrderId: data.workOrderId, productionItemId: data.productionItemId, businessRelationId: data.customerId, isInstructionPopupOpen: false });
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
            "/manufacture/dispatchAdd",
            {
                materialReleaseId: this.state.materialReleaseId,
                productionItemId: this.state.productionItemId,
                workOrderId: this.state.workOrderId,
                businessRelationId: this.state.businessRelationId,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/manufacture/dispatchList');
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
            <div style={{padding: '30px'}}>
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
                <div>
                    <Typography variant="h4" style={style}> 생산 불출 등록 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>불출입력</Button>
                </div>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>생산 불출 코드</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle300px}
                                    type="text"
                                    name="materialReleaseId"
                                    className="redPlaceholder"
                                    placeholder="생산 불출 코드는 자동으로 생성됩니다."
                                    onChange={this.onChangeHandler}
                                    readOnly
                                    value={this.state.materialReleaseId}
                                />
                            </TableCell>
                            <TableCell style={tableCellTitleStyle}>생산 품목 코드</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle300px}
                                    type="text"
                                    name="productionItemId"
                                    placeholder="생산 품목 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openProductionPopup}
                                    readOnly
                                    value={this.state.productionItemId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>작업 지시서 코드</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle300px}
                                    type="text"
                                    name="workOrderId"
                                    placeholder="작업 지시서 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openInstructionPopup}
                                    value={this.state.workOrderId}
                                    readOnly
                                />
                            </TableCell>
                            <TableCell style={tableCellTitleStyle}>거래처 코드</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle300px}
                                    type="text"
                                    name="businessRelationId"
                                    size="10"
                                    placeholder="거래처 코드(검색)"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openCustomerPopup}
                                    value={this.state.businessRelationId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <div>
                    <Button variant="contained" style={normalButton} onClick={this.addSample}>찾기(F3)</Button>
                    <Button variant="contained" style={normalButton} onClick={this.addSample}>정렬</Button>
                </div>
                <div style={tableInterval}>
                    <Table style={tableStyle}>
                        <TableHead style={{borderBottomStyle: '1px solid lightgray'}}>
                            <TableRow style={{backgroundColor: 'lightgray'}}>
                                <TableCell style={{...tableCellTitleStyle2, textAlign: 'center'}}>No.</TableCell>
                                <TableCell style={tableCellTitleStyle2}> 원자재 코드 </TableCell>
                                <TableCell style={tableCellTitleStyle2}> 원자재 이름 </TableCell>
                                <TableCell style={tableCellTitleStyle2}> 창고코드 </TableCell>
                                <TableCell style={tableCellTitleStyle2}> 수량 </TableCell>
                                <TableCell style={{...tableCellTitleStyle2, textAlign: 'center'}}>행 삭제</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.details.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{...tableCellTitleStyle2, backgroundColor: 'lightgray', textAlign: 'center'}}>
                                        {index + 1}
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={InputStyle200px}
                                            type="text"
                                            name={`details[${index}].materialId`}
                                            placeholder="원자재 코드(검색)"
                                            readOnly
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openMaterialPopup(index)}
                                            value={detail.materialId}
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={InputStyle200px}
                                            type="text"
                                            name={`details[${index}].name`}
                                            placeholder="원자재 이름"
                                            readOnly
                                            onChange={this.onChangeHandler}
                                            value={detail.name}
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={InputStyle200px}
                                            type="text"
                                            name={`details[${index}].storageId`}
                                            placeholder="창고코드"
                                            readOnly
                                            onChange={this.onChangeHandler}
                                            value={detail.storageId}
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={quantityInputStyle}
                                            type="text"
                                            name={`details[${index}].quantity`}
                                            placeholder="수량"
                                            onChange={this.onChangeHandler}
                                            value={detail.quantity}
                                        />
                                    </TableCell>

                                    <TableCell style={{...tableCellTitleStyle2, display: 'flex', justifyContent: 'center'}}>
                                        <Button variant="contained" style={deleteButton} onClick={() => this.removeField(index)}> 삭제
                                            <img className="garbageImage" 
                                                alt="garbage" 
                                                src="../images/garbage.png" 
                                                style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                            />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                        <Button variant="contained" style={normalButton} onClick={this.addNewField}>항목 추가</Button>
                    </div> 
                </div>
            </div>
        );
    }
}

export default dispatchAdd;

const style = {
    display: 'flex',
    justifyContent: 'left'
};

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
};

// 테이블 셀 이름 스타일(테이블 1)
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    border: 'none',
    paddingLeft: '30px'
}

// 테이블 셀 이름 스타일(테이블2)
const tableCellTitleStyle2 = {
    width: '240px',
    height: '50px',
    fontSize: '20px',
    border: 'none',
};

// 테이블 셀 속성
const tableCellStyle = {
    border: 'none',
};

// 500px input창 속성
const InputStyle500px = {
    width: '500px',
    height: '50px',
    padding: '5px 10px',
};

// 300px input창 속성
const InputStyle300px = {
    width: '300px',
    height: '50px',
    padding: '5px 10px',
};

// width 200px input창 속성
const InputStyle200px = {
    width: '200px',
    height: '50px',
    padding: '5px 10px',
};

// 수량 입력창 속성(100px)
const quantityInputStyle = {
    width: '100px',
    height: '50px',
    padding: '5px 10px',
};

const labelStyle = {
    fontSize: '20px',
    display: 'flex',
    float: 'left',
    alignItems: 'center',
    paddingRight: '20px'
};

// 체크박스 속성
const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '160px',
    height: '50px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    fontSize: '18px'
};

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px',
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};

// 밑줄
const divLineStyle = {
    borderBottom: '3px solid navy'
};

// 테이블 간격 조정(테이블 2개 이상시)
const tableInterval = {
    paddingTop: '50px'
};