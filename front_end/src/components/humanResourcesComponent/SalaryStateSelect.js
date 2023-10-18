import React, { Component, Fragment } from "react";
import { Table, TableBody, TableRow, TableCell, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";

class SalaryStateSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            empDatas: []
        }
    }

    componentDidMount(){
        
        request(
            "GET",
            "/humanResources/empList",
            {

            }).then((response) => {
                const data = response.data
                const calSalary = data.map((data) => (parseInt(data, 10)*2).toString())
                this.setState({
                    empDatas: response.data,
                    
                });
                console.log('calSalary: ', calSalary.map((data=>data.salary)));
                console.log('data: ',data.map((data=>data.salary)));
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
                    <Table>
                        <TableBody>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd} rowSpan={2}>성명</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={2}>부서명</TableCell>
                                <TableCell style={tableLineAdd}>기본급</TableCell>
                                <TableCell style={tableLineAdd}>야근수당</TableCell>
                                <TableCell style={tableLineAdd2}>주말근무수당</TableCell>
                                <TableCell style={tableLineAdd}>연차수당</TableCell>
                                <TableCell style={tableLineAdd2}>출산보육수당</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>지급총액</TableCell>
                                <TableCell style={tableLineAdd}>소득세</TableCell>
                                <TableCell style={tableLineAdd}>주민세</TableCell>
                                <TableCell style={tableLineAdd}>국민연금</TableCell>
                                <TableCell style={tableLineAdd}>건강보험</TableCell>
                                <TableCell style={tableLineAdd}>고용보험</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>공제총액</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>실지급액</TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd}>부양가족수당</TableCell>
                                <TableCell style={tableLineAdd}>식대</TableCell>
                                <TableCell style={tableLineAdd}>차량유지비</TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}>장기요양</TableCell>
                                <TableCell style={tableLineAdd}>연말정산</TableCell>
                                <TableCell style={tableLineAdd}>사우회비</TableCell>
                                <TableCell style={tableLineAdd}>공제항목 추가 가능</TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd}>사원번호</TableCell>
                                <TableCell style={tableLineAdd}>직급</TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                            </TableRow>
                            {this.state.empDatas.map(data => 
                                <Fragment>
                                    <TableRow>
                                        <TableCell style={tableLine}>{data.name}</TableCell>
                                        <TableCell style={tableLine}>{data.departmentId}</TableCell>
                                        <TableCell style={tableLine}>{data.salary}</TableCell>
                                        <TableCell style={tableLine}>{0 === 0 ? "" : ""}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine} rowSpan={2}>{data.totalSalary}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}>{data.nationalPension}</TableCell>
                                        <TableCell style={tableLine}>{data.healthInsurance}</TableCell>
                                        <TableCell style={tableLine}>{data.employInsurance}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={tableLine}>{data.employeeId}</TableCell>
                                        <TableCell style={tableLine}>{data.position}</TableCell>
                                        <TableCell style={tableLine}>{data.DependentFamiliyPay}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}>{data.carPay}</TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}></TableCell>
                                        <TableCell style={tableLine}>{data.totaldeduction}</TableCell>
                                        <TableCell style={tableLine}>{data.totalSalaryReal}</TableCell>
                                        
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
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    padding: '0',
    fontWeight: 'bold',
    width: '7%',
    height: '10px'
}
const tableLine2 = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    padding: '0',
    fontWeight: 'bold',
    width: '8%',
    height: '12px'
}
const tableLineAlign = {
    textAlign: 'center'
}
const tableLineAdd = { ...tableLine, ...tableLineAlign}
const tableLineAdd2 = { ...tableLine2, ...tableLineAlign}



export default SalaryStateSelect;