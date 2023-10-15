import React, { Component } from "react";
import { Table, TableBody, TableRow, TableCell, Button, Alert } from '@mui/material';
import { request } from "../../helpers/axios_helper";

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
        const emp = window.localStorage.getItem("emp");
        console.log("edit:" + emp)
        if(emp !== null){
            const parseEmp = JSON.parse(emp);
            this.setState(parseEmp);
            window.localStorage.removeItem("emp");
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

    // 직원 추가
    onSubmitEmpAdd = (e) => {
        e.preventDefault();
        if(this.state.password === this.state.chkpassword){
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
                }).then((response) => {
                    console.log('response : ', response);   
                    this.props.history.push('/humanResourceImg/empList');
                }).catch((error) => {
                    console.log('error : ', error); 
                })
            
        }
    }
    render(){
        return(
            <div>
                <div>
                    <Button style={trapezoidButton}>사원등록</Button>
                </div>
                <div>               
                    <Table style={{ backgroundColor: 'lightgray'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell >사원번호</TableCell>
                                <TableCell ><input type="text" name="employeeId" placeholder="사원번호" onChange={this.onChangeEmpHandler} value={this.state.employeeId}/></TableCell>
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
                                <TableCell ><input type="text" name="position" placeholder="직책" onChange={this.onChangeEmpHandler} value={this.state.position}/></TableCell>
                                <TableCell >퇴사일자</TableCell>
                                <TableCell ><input type="date" name="leaveDate" placeholder="퇴사일자" onChange={this.onChangeEmpHandler} value={this.state.leaveDate}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >퇴직사유</TableCell>
                                <TableCell ><input type="text" name="leaveReason" placeholder="퇴직사유" onChange={this.onChangeEmpHandler} value={this.state.leaveReason}/></TableCell>
                                <TableCell >전화</TableCell>
                                <TableCell ><input type="text" name="phone" placeholder="전화" onChange={this.onChangeEmpHandler} value={this.state.phone}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >이메일</TableCell>
                                <TableCell ><input type="text" name="email" placeholder="이메일" onChange={this.onChangeEmpHandler} value={this.state.email}/></TableCell>
                                <TableCell >부서코드</TableCell>
                                <TableCell ><input type="text" name="departmentId" placeholder="부서코드" onChange={this.onChangeEmpHandler} value={this.state.departmentId}/></TableCell>
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
                                <TableCell ><input type="text" name="postMail" placeholder="우편번호" onChange={this.onChangeEmpHandler} value={this.state.postMail}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >주소</TableCell>
                                <TableCell ><input type="text" name="address" placeholder="주소" onChange={this.onChangeEmpHandler} value={this.state.address}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >기본급</TableCell>
                                <TableCell ><input type="text" name="salary" placeholder="기본급" onChange={this.onChangeEmpHandler} value={this.state.salary}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >비밀번호</TableCell>
                                <TableCell ><input type="password" name="password" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.password}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >비밀번호 확인</TableCell>
                                <TableCell ><input type="password" name="chkpassword" placeholder="비밀번호" onChange={this.onChangeEmpHandler} value={this.state.chkpassword}/></TableCell>
                                {this.state.password === this.state.chkpassword ? "암호가 일치합니다." : "암호가 일치하지 않습니다."}
                            </TableRow>
                        </TableBody>
                    </Table>
                    <hr />
                    <Button onClick={this.onSubmitEmpAdd}>저장</Button>
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

export default empAdd;