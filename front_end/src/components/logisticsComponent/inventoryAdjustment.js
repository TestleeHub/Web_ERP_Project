import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";
import Popup from "../popUp/productionPopup";
import Modal from 'react-modal';
import customButtonStyle from '../../css/customButton.module.css';

// 재고 입력(inventoryAdjustment)
class inventoryAdjustment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productionItemId: "",
            registDate: "",
            managerId: "",
            storageId: "",
            quantity: "",
            record: this.getCurrentDate()
        }
    }


    getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    
    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("inventoryData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('inventoryData');
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
        this.setState({ productionItemId: data.productionItemId, isPopupOpen: false });
    }

    
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    // 추가 요청
    onSubmitAdd = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/logistics/inventoryListAdd",
            {
                productionItemId: this.state.productionItemId,
                registDate: this.state.registDate,
                managerId: this.state.managerId,
                storageId: this.state.storageId,
                quantity: this.state.quantity,
                record: this.state.record

            }).then((response) => {
                alert('등록되었습니다.');
                console.log('response : ', response);
                this.props.history.push('/logistics/inventoryList');
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


    render() {
        return(
            <div style={{padding: '30px'}}>
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
                                width: '700px',  // 원하는 폭으로 설정
                                height: '400px', // 원하는 높이로 설정
                                top: '50%',      // 원하는 수직 위치로 설정
                                left: '55%',     // 원하는 수평 위치로 설정
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
                    <Typography variant="h4" style={customButtonStyle.style}>재고 입력</Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                </div>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 제품 코드 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    readOnly
                                    type="text"
                                    name="productionItemId"
                                    className="redPlaceholder"
                                    placeholder="제품 코드는 자동으로 생성됩니다."
                                    onChange={this.onChangeHandler}
                                    value={this.state.productionItemId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>창고 코드</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    readOnly
                                    type="text"
                                    name="storageId"
                                    placeholder="창고 코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.storageId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>담당자</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    readOnly
                                    type="text"
                                    name="manager"
                                    placeholder="담당자"
                                    onChange={this.onChangeHandler}
                                    value={this.state.managerId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 등록일 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={shortInputStyle}
                                    readOnly
                                    type="date"
                                    name="registDate"
                                    placeholder="등록일"
                                    onChange={this.onChangeHandler}
                                    value={this.formatDate(this.state.registDate)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>수량</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={quantityInputStyle}
                                    type="number"
                                    name="quantity"
                                    min="0"
                                    placeholder="0"
                                    onChange={this.onChangeHandler}
                                    value={this.state.quantity}
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

export default inventoryAdjustment;

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
};

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    border: 'none',
    paddingLeft: '30px',
};

// 테이블 셀 스타일
const tableCellStyle = {
    border: 'none'
};

const style = {
    display: 'flex',
    justifyContent: 'left'
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
    fontSize: '18px'
};

// 500px input 창
const longInputStyle = {
    width: '500px',
    height: '50px',
    padding: '5px 10px',
};

// 300px input 창
const shortInputStyle = {
    width: '300px',
    height: '50px',
    padding: '5px 10px',
};

// 수량 입력 창
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

// 체크박스 스타일
const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

// 밑줄
const divLineStyle = {
    borderBottom: '3px solid navy'
};