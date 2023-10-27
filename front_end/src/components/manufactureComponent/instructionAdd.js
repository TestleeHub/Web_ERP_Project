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

            <div style={{padding: '30px'}}>
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
                <div>
                    <Typography variant="h4" style={style}> 작업지시서 등록 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 작업지시서 코드 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="workOrderId"
                                    className="redPlaceholder"
                                    placeholder="작업 지시서 코드는 자동으로 생성됩니다." 
                                    onChange={this.onChangeHandler}
                                    value={this.state.workOrderId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>거래처</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
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
                            <TableCell style={tableCellTitleStyle}>담당자</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
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
                            <TableCell style={tableCellTitleStyle}>지시서 명</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="name"
                                    placeholder="지시서 명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>수량</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={quantityInputStyle}
                                    type="text"
                                    name="quantity"
                                    placeholder="수량"
                                    onChange={this.onChangeHandler}
                                    value={this.state.quantity}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>규격</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={quantityInputStyle}
                                    type="text"
                                    name="standard"
                                    placeholder="규격"
                                    onChange={this.onChangeHandler}
                                    value={this.state.standard}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>받는창고</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
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
                            <TableCell style={tableCellTitleStyle}>납기일</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle300px}
                                    type="date"
                                    name="dueDate"
                                    placeholder="납기일"
                                    onChange={this.onChangeHandler}
                                    value={this.state.dueDate}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>생산품</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
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
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
            </div>
        );
    }
}

export default instructionAdd;

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