import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";

class customerInsert extends Component {
    state = {
        customerId: "",
        name: "",
        ceoName: "",
        phone: "",
        faxNumber: "",
        type: "",
        bank: "",
        account: "",
        postMail: '',
        address: ''
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("customerData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('customerData');
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
            "/customer/customerAdd",
            {
                customerId: this.state.customerId,
                name: this.state.name,
                ceoName: this.state.ceoName,
                phone: this.state.phone,
                faxNumber: this.state.faxNumber,
                type: this.state.type,
                bank: this.state.bank,
                account: this.state.account,
                postMail: this.state.postMail,
                address: this.state.address
            }).then((response) => {
                console.log('response : ', response);
                window.confirm("등록에 성공하였습니다.")
                this.props.history.push('/customer/customerList');
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

    searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                this.setState({
                    postMail: data.zonecode,
                    address: data.address
                });
            }
        }).open();
    }

    // 거래처 목록 페이지로 이동 함수
    goToCustomerList = () => {
        this.props.history.push("/customer/customerList");
    }

    render() {
        return (

            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant="h4" style={style}> 거래처 등록 </Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.customerInsert}>기본</Button>
                </div>
                <div>
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}> 거래처 코드 </TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="customerId"
                                        className="redPlaceholder"
                                        placeholder="거래처 코드는 자동으로 생성됩니다."
                                        onChange={this.onChangeHandler}
                                        value={this.state.customerId}
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>거래처명</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="name"
                                        placeholder="거래처명(이름)"
                                        onChange={this.onChangeHandler}
                                        value={this.state.name}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>대표자명</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="ceoName"
                                        placeholder="대표자명"
                                        onChange={this.onChangeHandler}
                                        value={this.state.ceoName}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>전화번호</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="phone"
                                        placeholder="전화번호"
                                        onChange={this.onChangeHandler}
                                        value={this.state.phone}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>팩스번호</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="faxNumber"
                                        placeholder="팩스번호"
                                        onChange={this.onChangeHandler}
                                        value={this.state.faxNumber}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>업종</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="type"
                                        placeholder="업종"
                                        onChange={this.onChangeHandler}
                                        value={this.state.type}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>은행</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="bank"
                                        placeholder="은행"
                                        onChange={this.onChangeHandler}
                                        value={this.state.bank}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>계좌번호</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="account"
                                        placeholder="계좌번호"
                                        onChange={this.onChangeHandler}
                                        value={this.state.account}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>우편번호</TableCell>
                                <TableCell style={tableCellStyle}>
                                <Button onClick={this.searchAddress}>주소검색</Button>
                                <br />
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="postMail"
                                        placeholder="우편번호"
                                        onChange={this.onChangeHandler}
                                        value={this.state.postMail}
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>상세주소</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle500px}
                                        type="text"
                                        name="address"
                                        placeholder="상세주소"
                                        onChange={this.onChangeHandler}
                                        value={this.state.address}
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.goToCustomerList}>목록</Button>
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
export default withRouter(customerInsert);