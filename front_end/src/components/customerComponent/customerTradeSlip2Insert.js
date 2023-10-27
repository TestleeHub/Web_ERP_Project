import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";
import CustomerPopup from "../popUp/customerPopup";
import Modal from 'react-modal';

class customerTradeSlip2Insert extends Component {
    state = {
        slipId: "",
        tradeType: "출금",
        money: "",
        customerId: "",
        title: "",
        regDate: "",
        openDialog: false,
        isCustomerPopupOpen: false
    }
    // 팝업 열기
    openCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: true });
    }
    // 팝업 닫기
    closeCustomerPopup = () => {
        this.setState({ isCustomerPopupOpen: false });
    }
    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleCustomerPopupData = (data) => {
        this.setState({ customerId: data.customerId, isCustomerPopupOpen: false });
    }

    // 입력 성공 후 "거래처 출금 목록" 페이지로 이동
    handleCloseDialog = () => {
        this.setState({ openDialog: false });
        this.props.history.push("/customer/customerTradeSlip2"); // "거래처 출금 목록" 페이지 경로
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("tradeSlipData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('tradeSlipData');
        }
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
            "/customer/tradeSlipAdd",
            {
                slipId: this.state.slipId,
                tradeType: this.state.tradeType,
                money: this.state.money,
                customerId: this.state.customerId,
                title: this.state.title
            }).then((response) => {
                console.log('response : ', response);
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/customer/customerTradeSlip2');
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                    window.location.reload();
                }else if(error.response.status === 401){
                    alert('로그인이 필요합니다.')
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    this.props.history.push('/login');
                    window.location.reload();
                }
            })

    }

    // 거래처 출금 목록 페이지로 이동 함수
    goToCustomerTradeSlip2 = () => {
        this.props.history.push("/customer/customerTradeSlip2");
    }

    render() {
        return (
            <div style={{padding:'30px'}}>
                {/* 팝업 시작 */}
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
                    <Typography variant="h4" style={style}> 거래처 출금 처리 </Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={tableStyle}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 전표번호 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="slipId"
                                    className="redPlaceholder"
                                    placeholder="전표 번호는 자동으로 생성됩니다."
                                    onChange={this.onChangeHandler}
                                    value={this.state.slipId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 거래유형 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="tradeType"
                                    placeholder="거래유형"
                                    onChange={this.onChangeHandler}
                                    value="출금"
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 금액 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={quantityInputStyle}
                                    type="text"
                                    name="money"
                                    placeholder="금액"
                                    onChange={this.onChangeHandler}
                                    value={this.state.money}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 거래처코드 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="customerId"
                                    placeholder="거래처코드"
                                    onChange={this.onChangeHandler}
                                    onClick={this.openCustomerPopup}
                                    value={this.state.customerId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 제목 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={InputStyle500px}
                                    type="text"
                                    name="title"
                                    placeholder="제목"
                                    onChange={this.onChangeHandler}
                                    value={this.state.title}  //
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.goToCustomerTradeSlip2}>출금목록</Button>
                {/* <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                >
                    <DialogTitle>알림</DialogTitle>
                    <DialogContent>
                        저장되었습니다.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        );
    }
}

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


export default withRouter(customerTradeSlip2Insert);