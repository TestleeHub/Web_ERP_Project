import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class empList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            empDatas: [],
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

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount(){
        this.reloadEmpList();
    }

    // emplist 정보
    reloadEmpList = (e) => {
        request(
            "GET",
            "/humanResources/empList",
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                this.setState({
                    empDatas: response.data,
                });
                console.log('response: ',response);
            }).catch((error) => {
                console.log('error: ', error);
            })
        
    }
    // emp 삭제
    deleteEmp = (emp) => {
        console.log(emp)
        console.log(emp.employeeId)
        request(
            "PUT",
            "/humanResources/empDelete",
            {
                employeeId: emp.employeeId,
                name: emp.name,
                foreignName: emp.foreignName,
                socialNum: emp.socialNum,
                position: emp.position,
                leaveDate: emp.leaveDate,	 
                leaveReason: emp.leaveReason,
                phone: emp.phone,
                email: emp.email,		 
                departmentId: emp.departmentId,
                bankCode: emp.bankCode,
                account: emp.account,	
                accountName: emp.accountName,	  
                postMail: emp.postMail,	
                address: emp.address,
                salary: emp.salary,	
                password: emp.password,
                chkpassword : emp.chkpassword,
                joinDate: emp.joinDate
            }).then((response) => {
                console.log('response: ',response);
                
            }).catch((error) => {
                console.log('error: ', error);
            })
        this.props.history.push('/humanResources/empList');
        
    } 
    // emp 수정
    updateEmp = (emp) => {
        console.log("emp: " + emp)
        window.localStorage.setItem("emp", JSON.stringify(emp))
        this.props.history.push('/humanResources/empAdd');
    }
    // 재직증명서
    tenure = (emp) => {
        console.log("emp: " + emp)
        window.localStorage.setItem("emp", JSON.stringify(emp))
        this.props.history.push('/humanResources/empProofMaking');
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    render(){
        return(
            
            <div> 
                <div className="centerDivCss">
                    <div>
                        <Button style={trapezoidButton}>사원리스트</Button>
                    </div>
                </div>
                <div className="centerDivCss">
                    
                    <div>
                        <Table style={{ backgroundColor: 'lightgray'}}>
                            <TableHead>
                                <TableRow>
                                <TableCell><input type="checkbox"/></TableCell>
                                <TableCell>입사일자</TableCell>
                                <TableCell>사원번호</TableCell>
                                <TableCell>성명</TableCell>
                                <TableCell>부서코드</TableCell>
                                <TableCell>직책</TableCell>
                                <TableCell>계좌번호</TableCell>
                                <TableCell>급여구분</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.empDatas.map(emp => 
                                <TableRow>
                                    <TableCell><input type="checkbox" name={emp.employeeId}/></TableCell>
                                    <TableCell>{this.formatDate(emp.joinDate)}</TableCell>
                                    <TableCell>{emp.employeeId}</TableCell>
                                    <TableCell>{emp.name}</TableCell>
                                    <TableCell>{emp.departmentId}</TableCell>
                                    <TableCell>{emp.position}</TableCell>
                                    <TableCell>{emp.account}</TableCell>
                                    <TableCell>{emp.salary}</TableCell>    
                                    <TableCell>
                                        <Button onClick={() => this.updateEmp(emp)}>수정</Button>
                                        <Button onClick={() => this.deleteEmp(emp)}>삭제</Button>
                                        <Button onClick={() => this.tenure(emp)}>재직 증명서</Button>
                                    </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    
                    
                </div>
                <hr/>
                <div>
                    
                </div>
            </div>
            // 전체 div 끝
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

export default empList;