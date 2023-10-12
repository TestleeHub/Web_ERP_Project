import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class empList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            empDatas: []            
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
    // emp 수정
    updateEmp = (e) => {

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
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell><input type="checkbox"/></TableCell>
                                <TableCell>입사일자</TableCell>
                                <TableCell>사원번호</TableCell>
                                <TableCell>성명</TableCell>
                                <TableCell>부서명</TableCell>
                                <TableCell>직책</TableCell>
                                <TableCell>계좌번호</TableCell>
                                <TableCell>급여구분</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.empDatas.map(emp => 
                                    
                                <TableRow>
                                    <TableCell><input type="checkbox"/></TableCell>
                                    <TableCell>{emp.joinDate}</TableCell>
                                    <TableCell>{emp.employeeId}</TableCell>
                                    <TableCell>{emp.name}</TableCell>
                                    <TableCell>{emp.departmentId}</TableCell>
                                    <TableCell>{emp.position}</TableCell>
                                    <TableCell>{emp.account}</TableCell>
                                    <TableCell>{emp.salary}</TableCell>    
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    
                    
                </div>
                <hr/>
                <div>
                    <Button onClick={this.updateEmp}>수정</Button>
                    <Button>삭제</Button>
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