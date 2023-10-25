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
            registDate: this.formatDate(new Date().getTime()),
            purchaseBookId: "",
            orderFormId:"",
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

    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }
    closeD_Popup = () => {
        this.setState({ isD_PopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handlePopupData = (data) => {
        this.setState({ orderFormId: data.orderFormId, isPopupOpen: false });
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
                    standard: detailData.standard,
                    quantity: detailData.quantity,
                    price: detailData.price
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
        if (!this.state.customerId || !this.state.employeeId || this.state.details.length === 0) {
            alert('저장 실패');
            return;
        }
        request(
            "POST",
            "/purchase/purchaseForm",
            {
                purchaseId: this.state.purchaseId,
                customerId: this.state.customerId,
                employeeId: this.state.employeeId,
                registDate: this.state.registDate,
                purchaseBookId: this.state.purchaseBookId,
                orderFormId: this.state.orderFormId,
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

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    onReset = () => {
        this.setState({
            purchaseId: "",
            customerId: "",
            employeeId: "",
            registDate: "",
            orderFormId: "",
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
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.purchaseForm}>구매 입력</Button>
                </div>
                <div>
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>구매 코드</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="purchaseId"
                                        className="redPlaceholder"
                                        placeholder="구매 코드는 자동으로 생성됩니다."
                                        value={this.state.purchaseId}
                                        onChange={this.onChangeHandler}
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>거래처</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
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
                                <TableCell style={tableCellTitleStyle}>납기 일자</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="date"
                                        name="registDate"
                                        value={this.state.registDate}
                                        onChange={this.onChangeHandler}
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>담당자</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
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
                    <Button variant="outline-success" style={normalButton} onClick={this.orderList}>발주 목록</Button>
                    <Button variant="outline-success" style={normalButton} onClick={this.purchaseList}>구매 목록</Button>
                </div>
                <div style={tableInterval}>
                    <Table style={tableStyle}>
                        <TableHead style={{borderBottomStyle: '1px solid lightgray'}}>
                            <TableRow style={{backgroundColor: 'lightgray'}}>
                                <TableCell style={{...tableCellTitleStyle2, textAlign: 'center'}}>No.</TableCell>
                                <TableCell style={tableCellTitleStyle2}>원재료코드</TableCell>
                                <TableCell style={tableCellTitleStyle2}>규격</TableCell>
                                <TableCell style={tableCellTitleStyle2}>수량</TableCell>
                                <TableCell style={tableCellTitleStyle2}>단가</TableCell>
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
                                            placeholder="원재료 코드"
                                            onChange={this.onChangeHandler}
                                            onClick={() => this.openD_Popup(index)}
                                            value={detail.materialId}
                                            readOnly
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={InputStyle200px}
                                            type="text"
                                            name={`details[${index}].standard`}
                                            placeholder="규격"
                                            onChange={this.onChangeHandler}
                                            value={detail.standard}
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={quantityInputStyle}
                                            type="text"
                                            name={`details[${index}].quantity`}
                                            onChange={this.onChangeHandler}
                                            value={detail.quantity}
                                        />
                                    </TableCell>

                                    <TableCell style={tableCellTitleStyle2}>
                                        <input style={quantityInputStyle}
                                            type="text"
                                            name={`details[${index}].price`}
                                            onChange={this.onChangeHandler}
                                            value={detail.price}
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