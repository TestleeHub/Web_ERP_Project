import React, { Component, Fragment } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class SalaryStateSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            empDatas: [],
            overPay: null
        }
    }

    componentDidMount(){
        
        request(
            "GET",
            "/humanResources/empList",
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                console.log("response.data.salary: " + response.data.salary)
                // const intVal = response.data.salary

                //const intVal = Number(response.data.salary)

                this.setState({
                    empDatas: response.data,
                    // total: intTotal.toString()
                    // overPay: intVal

                });
                console.log('response: ',response);
            }).catch((error) => {
                console.log('error: ', error);
            })
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

            
                <div>
                    <Button style={trapezoidButton}>급여조회</Button>
                </div>
                <div>
                    <Table style={{ backgroundColor: 'lightgray'}}>
                        <TableBody>
                            
                            <TableRow>
                                <TableCell style={tableLine} rowSpan={2}>성명</TableCell>
                                <TableCell style={tableLine} rowSpan={2}>부서명</TableCell>
                                <TableCell style={tableLine}>기본급</TableCell>
                                <TableCell style={tableLine}>야근수당</TableCell>
                                <TableCell style={tableLine}>주말근무수당</TableCell>
                                <TableCell style={tableLine}>연차수당</TableCell>
                                <TableCell style={tableLine}>출산보육수당</TableCell>
                                <TableCell style={tableLine} rowSpan={3}>지급총액</TableCell>
                                <TableCell style={tableLine}>소득세</TableCell>
                                <TableCell style={tableLine}>주민세</TableCell>
                                <TableCell style={tableLine}>국민연금</TableCell>
                                <TableCell style={tableLine}>건강보험</TableCell>
                                <TableCell style={tableLine}>고용보험</TableCell>
                                <TableCell style={tableLine} rowSpan={3}>공제총액</TableCell>
                                <TableCell style={tableLine} rowSpan={3}>실지급액</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableLine}>부양가족수당</TableCell>
                                <TableCell style={tableLine}>식대</TableCell>
                                <TableCell style={tableLine}>차량유지비</TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}>장기요양</TableCell>
                                <TableCell style={tableLine}>연말정산</TableCell>
                                <TableCell style={tableLine}>사우회비</TableCell>
                                <TableCell style={tableLine}>공제항목 추가 가능</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableLine}>사원번호</TableCell>
                                <TableCell style={tableLine}>직원/직급명</TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                                <TableCell style={tableLine}></TableCell>
                            </TableRow>
                            {this.state.empDatas.map(data => 
                                <Fragment>
                                    <TableRow>
                                        <TableCell style={tableLine}>{data.name}</TableCell>
                                        <TableCell style={tableLine}>{data.departmentId}</TableCell>
                                        <TableCell style={tableLine}>{data.salary}</TableCell>
                                        <TableCell style={tableLine}>0</TableCell>
                                        <TableCell style={tableLine}>0</TableCell>
                                        <TableCell style={tableLine}>0</TableCell>
                                        <TableCell style={tableLine}>{this.state.overPay}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={tableLine}>{data.employeeId}</TableCell>
                                        <TableCell style={tableLine}>{data.position}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                    </TableRow>
                                </Fragment>
                            )}
                        </TableBody>
                    </Table>
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

const tableLine = {
    borderRight: '1px solid black',
    borderBottom: '1px solid black'
}



export default SalaryStateSelect;