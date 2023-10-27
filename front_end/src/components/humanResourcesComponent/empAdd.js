import React, { Component } from "react";
import { Table, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole } from "../../helpers/axios_helper";

class empAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeId: "",
            name: "",
            foreignName: "",
            socialNum: "",
            position: "",
            leaveDate: "",
            leaveReason: "",
            phone: "",
            email: "",
            departmentId: "",
            bankCode: "",
            account: "",
            accountName: "",
            postMail: "",
            address: "",
            salary: "",
            password: "",
            chkpassword: "",
            joinDate: ""
        }
    }

    // 수정페이지 처리
    componentDidMount() {
        console.log("호출")
        const data = window.localStorage.getItem("data");
        console.log("edit:" + data)
        if (data !== null) {
            const parseData = JSON.parse(data);
            parseData.departmentId = ""
            this.setState(parseData);

            window.localStorage.removeItem("data");
        }

    }

    // 다시 호출했을때 삭제하기 수정 -> 등록 살려줘
    componentDidUpdate(prevProps) {
        // 현재 페이지가 다시 호출될 때 (예: 라우팅 변경 시) 기존 값을 초기화
        console.log("componentDidUpdate호출")
        if (this.props.location !== prevProps.location) {
            this.setState({
                // 초기화하고자 하는 상태 값
                employeeId: "",
                name: "",
                foreignName: "",
                socialNum: "",
                position: "",
                leaveDate: "",
                leaveReason: "",
                phone: "",
                email: "",
                departmentId: "",
                bankCode: "",
                account: "",
                accountName: "",
                postMail: "",
                address: "",
                salary: "",
                password: "",
                chkpassword: "",
                joinDate: ""
            });
        }
    }
    onChangeEmpHandler = (e) => {
        let fieldName = e.target.name;
        let value = e.target.value;

        console.log(fieldName)
        console.log(value)

        this.setState({
            [fieldName]: value
        });

    }



    // 직원 추가/수정/삭제
    onSubmitEmpAdd = (e) => {
        e.preventDefault();
        const pw = this.state.password;
        const chkpw = this.state.chkpassword;

        if (this.state.departmentId === '') {
            console.log("부서이름 없음")
            return
        }
        if (pw === chkpw && pw !== "") {
            request(
                "POST",
                "/humanResources/empAdd",
                {
                    employeeId: this.state.employeeId,
                    name: this.state.name,
                    foreignName: this.state.foreignName,
                    socialNum: this.state.socialNum,
                    position: this.state.position,
                    leaveDate: this.state.leaveDate,
                    leaveReason: this.state.leaveReason,
                    phone: this.state.phone,
                    email: this.state.email,
                    departmentId: this.state.departmentId,
                    bankCode: this.state.bankCode,
                    account: this.state.account,
                    accountName: this.state.accountName,
                    postMail: this.state.postMail,
                    address: this.state.address,
                    salary: this.state.salary,
                    password: this.state.password,
                    joinDate: this.state.joinDate
                }).then((response) => {
                    console.log('response : ', response);
                    this.props.history.push('/humanResources/empList');
                }).catch((error) => {
                    console.log('error : ', error);
                    if (error.response.status === 403) {
                        setAuthToken(null);
                        setUserId(null);
                        setUserRole(null);
                        console.log('접근 권한이 없습니다.');
                        this.props.history.push('/accessDenied');
                        window.location.reload();
                    } else if (error.response.status === 401) {
                        alert('로그인이 필요합니다.')
                        setAuthToken(null);
                        setUserId(null);
                        setUserRole(null);
                        this.props.history.push('/login');
                        window.location.reload();
                    }
                })

        }
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

    render() {
        return (
            <div style={{ padding: '30px' }}>
                <div>
                    <Typography variant="h4" style={style}> 사원 등록 </Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                    <Button style={trapezoidButton}>사원등록</Button>
                </div>
                <div>
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>사원번호</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="employeeId" placeholder="사원번호" onChange={this.onChangeEmpHandler} value={this.state.employeeId} />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>이름</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="name" placeholder="이름" onChange={this.onChangeEmpHandler} value={this.state.name} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>외국어성명</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="foreignName" placeholder="외국어성명" onChange={this.onChangeEmpHandler} value={this.state.foreignName} />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>주민번호</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="socialNum" placeholder="주민번호" onChange={this.onChangeEmpHandler} value={this.state.socialNum} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>직책</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="position" placeholder="직책" onChange={this.onChangeEmpHandler} value={this.state.position} />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>퇴사일자</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="date" style={shortInputStyle} name="leaveDate" placeholder="퇴사일자" onChange={this.onChangeEmpHandler} value={this.state.leaveDate} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>퇴직사유</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="leaveReason" placeholder="퇴직사유" onChange={this.onChangeEmpHandler} value={this.state.leaveReason} />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>전화</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="phone" placeholder="전화(010 제외)" onChange={this.onChangeEmpHandler} value={this.state.phone} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>이메일</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="email" placeholder="이메일" onChange={this.onChangeEmpHandler} value={this.state.email} />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>기본급</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="salary" placeholder="기본급" onChange={this.onChangeEmpHandler} value={this.state.salary} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>은행</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="bankCode" placeholder="은행" onChange={this.onChangeEmpHandler} value={this.state.bankCode} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>계좌번호</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="account" placeholder="계좌번호" onChange={this.onChangeEmpHandler} value={this.state.account} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>예금주</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="accountName" placeholder="예금주" onChange={this.onChangeEmpHandler} value={this.state.accountName} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>우편번호</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <Button onClick={this.searchAddress}>주소검색</Button>
                                    <input type="text" style={shortInputStyle} name="postMail" placeholder="우편번호" onChange={this.onChangeEmpHandler} value={this.state.postMail} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>주소</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="text" style={shortInputStyle} name="address" placeholder="주소" onChange={this.onChangeEmpHandler} value={this.state.address} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>부서코드</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <select name="departmentId" onChange={this.onChangeEmpHandler} style={shortInputStyle}>
                                        <option value="">부서선택</option>
                                        <option value="인사팀">인사팀</option>
                                        <option value="제조팀">제조팀</option>
                                        <option value="재무팀">재무팀</option>
                                        <option value="구매팀">구매팀</option>
                                        <option value="영업팀">영업팀</option>
                                        <option value="자재팀">자재팀</option>
                                    </select>
                                    <br />
                                    {this.state.departmentId === '' ? '부서를 선택해주세요' : ''}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>비밀번호</TableCell>
                                <TableCell style={tableCellTitleStyle}>
                                    <input type="password" style={shortInputStyle} name="password" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.password} />
                                    {
                                        (this.state.password === "") ? "암호를 입력해주세요" :
                                            (this.state.chkpassword === "") ? "확인을 입력해주세요" :
                                                (this.state.password === this.state.chkpassword) ? "암호가 일치합니다." : "암호가 일치하지 않습니다."
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>비밀번호 확인</TableCell>
                                <TableCell style={tableCellTitleStyle}><input type="password" style={shortInputStyle} name="chkpassword" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.chkpassword} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button variant="contained" style={normalButton} onClick={this.onSubmitEmpAdd}>등록</Button>
                </div>
            </div>
        );
    }
}

export default empAdd;

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    paddingLeft: '30px',
    textAlign: 'left',
    border: 'none'
}

// 테이블 셀 스타일
const tableCellStyle = {
    fontSize: '20px',
    border: 'none'
}

const style = {
    display: 'flex',
    justifyContent: 'left'
}

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

const labelStyle = {
    fontSize: '20px',
    display: 'flex',
    float: 'left',
    alignItems: 'center',
    paddingRight: '20px'
};

const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

const divLineStyle = {
    borderBottom: '3px solid navy'
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
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px'
}

// 수정 버튼 속성
const updateButton = {
    backgroundColor: '#FF8C0A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};