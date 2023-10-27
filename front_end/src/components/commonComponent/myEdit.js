import React, { Component } from "react";
import { Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { request, getUserId } from "../../helpers/axios_helper";

class empAdd extends Component{
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
            chkpassword : "",
            joinDate: ""
        }
    }

    // 수정페이지 처리
    componentDidMount() {
        this.reloadData();

    }
    
    reloadData = (e) => {
        const UserId = getUserId();
        console.log("현재 아이디:", UserId)
        
        request(
            "GET",
            "/myeEditPage/myDetail/" + UserId,
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                this.setState({
                    empDatas: response.data,
                    employeeId: response.data.employeeId,
                    name: response.data.name,
                    foreignName: response.data.foreignName,
                    socialNum: response.data.socialNum,
                    position: response.data.position,
                    leaveDate: response.data.leaveDate,
                    leaveReason: response.data.leaveReason,
                    phone: response.data.phone,
                    email: response.data.email,		 
                    departmentId: response.data.departmentId,
                    bankCode: response.data.bankCode,
                    account: response.data.account,	
                    accountName: response.data.accountName,	  
                    postMail: response.data.postMail,	
                    address: response.data.address,
                    salary: response.data.salary,	
                    joinDate: response.data.joinDate
                });
                console.log('response: ',response);
            }).catch((error) => {
                console.log('error: ', error);
            })

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

    // 직원 추가/수정/삭제
    onSubmitEmpAdd = (e) => {
        e.preventDefault();
        const pw = this.state.password;
        const chkpw = this.state.chkpassword;
        if(pw === chkpw && pw !== "" ){
            request(
                "POST",
                "/myeEditPage/empUpdate",
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
                })
            
        }
    }
    render(){
        return(
            <div>
                <div>
                    <Button style={trapezoidButton}>사원수정</Button>
                </div>
                <div>               
                    <Table style={{ backgroundColor: 'ghostwhite'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell >사원번호</TableCell>
                                <TableCell ><input type="text" name="employeeId" placeholder="사원번호" onChange={this.onChangeEmpHandler} value={this.state.employeeId} readOnly/></TableCell>
                                <TableCell >이름</TableCell>
                                <TableCell ><input type="text" name="name" placeholder="이름" onChange={this.onChangeEmpHandler} value={this.state.name}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >외국어성명</TableCell>
                                <TableCell ><input type="text" name="foreignName" placeholder="외국어성명" onChange={this.onChangeEmpHandler} value={this.state.foreignName}/></TableCell>
                                <TableCell >주민번호</TableCell>
                                <TableCell><input type="text" name="socialNum" placeholder="주민번호" onChange={this.onChangeEmpHandler} value={this.state.socialNum}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >직책</TableCell>
                                <TableCell ><input type="text" name="position" placeholder="직책" onChange={this.onChangeEmpHandler} value={this.state.position} readOnly/></TableCell>
                                <TableCell >퇴사일자</TableCell>
                                <TableCell ><input type="date" name="leaveDate" placeholder="퇴사일자" onChange={this.onChangeEmpHandler} value={this.state.leaveDate} readOnly/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >퇴직사유</TableCell>
                                <TableCell ><input type="text" name="leaveReason" placeholder="퇴직사유" onChange={this.onChangeEmpHandler} value={this.state.leaveReason} readOnly/></TableCell>
                                <TableCell >전화</TableCell>
                                <TableCell ><input type="text" name="phone" placeholder="전화" onChange={this.onChangeEmpHandler} value={this.state.phone}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >이메일</TableCell>
                                <TableCell ><input type="text" name="email" placeholder="이메일" onChange={this.onChangeEmpHandler} value={this.state.email}/></TableCell>
                                <TableCell >부서이름</TableCell>
                                <TableCell ><input type="text" name="departmentId" placeholder="부서이름" onChange={this.onChangeEmpHandler} value={this.state.departmentId} readOnly/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >은행</TableCell>
                                <TableCell ><input type="text" name="bankCode" placeholder="은행" onChange={this.onChangeEmpHandler} value={this.state.bankCode}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >계좌번호</TableCell>
                                <TableCell ><input type="text" name="account" placeholder="계좌번호" onChange={this.onChangeEmpHandler} value={this.state.account}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >예금주</TableCell>
                                <TableCell ><input type="text" name="accountName" placeholder="예금주" onChange={this.onChangeEmpHandler} value={this.state.accountName}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >우편번호</TableCell>
                                <TableCell>
                                    <Button onClick={this.searchAddress}>주소검색</Button>
                                    <input type="text" name="postMail" placeholder="우편번호" onChange={this.onChangeEmpHandler} value={this.state.postMail}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >주소</TableCell>
                                <TableCell ><input type="text" name="address" placeholder="주소" onChange={this.onChangeEmpHandler} value={this.state.address}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >기본급</TableCell>
                                <TableCell ><input type="text" name="salary" placeholder="기본급" onChange={this.onChangeEmpHandler} value={this.state.salary} readOnly/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >비밀번호</TableCell>
                                <TableCell >
                                    <input type="password" name="password" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.password}/>
                                    {
                                        (this.state.password === "") ? "암호를 입력해주세요" :
                                        (this.state.chkpassword === "") ? "확인을 입력해주세요" :
                                        (this.state.password === this.state.chkpassword) ? "암호가 일치합니다." : "암호가 일치하지 않습니다."
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >비밀번호 확인</TableCell>
                                <TableCell ><input type="password" name="chkpassword" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.chkpassword}/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <hr />
                    <Button variant="contained" style={normalButton} onClick={this.onSubmitEmpAdd}>수정</Button>
                </div>
            </div>
        );
    }
}

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
    width: '150px',
    height: '30px',
    padding: '10px 20px'
}

export default empAdd;