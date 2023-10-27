import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";
import EmployeePopup from "../popUp/employeePopup";
import StoragePopup from "../popUp/storagePopup";
import Modal from 'react-modal';

class productionAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productionItemId: "",
            process: "",
            name: "",
            standard: "",
            managerId: "",
            storageId: "",
            isEmployeePopupOpen: false,
            isStoregePopupOpen: false
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("productionData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('productionData');
        }
    }

    // 팝업 열기
    openEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: true });
    }
    openStoregePopup = () => {
        this.setState({ isStoregePopupOpen: true });
    }

    // 팝업 닫기
    closeEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: false });
    }
    closeStoregePopup = () => {
        this.setState({ isStoregePopupOpen: false });
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
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
            "/manufacture/productionListAdd",
            {
                productionItemId: this.state.productionItemId,
                process: this.state.process,
                name: this.state.name,
                standard: this.state.standard,
                managerId: this.state.managerId,
                storageId: this.state.storageId
            }).then((response) => {
                console.log('response : ', response);
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/manufacture/productionList');
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
                {/* 팝업 끝 */}
                <div>
                    <Typography variant="h4" style={style}> 품목등록 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 상품코드 </TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    type="text"
                                    name="productionItemId"
                                    className="redPlaceholder"
                                    placeholder="상품 코드는 자동으로 생성됩니다." 
                                    onChange={this.onChangeHandler}
                                    value={this.state.productionItemId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>제품명</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    type="text"
                                    name="name"
                                    placeholder="제품명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}>공정명</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
                                    type="text"
                                    name="process"
                                    placeholder="공정명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.process}
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
                            <TableCell style={tableCellTitleStyle}>담당자</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
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
                            <TableCell style={tableCellTitleStyle}>받는창고</TableCell>
                            <TableCell style={tableCellStyle}>
                                <input style={longInputStyle}
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
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
            </div>
        );
    }
}

export default productionAdd;

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