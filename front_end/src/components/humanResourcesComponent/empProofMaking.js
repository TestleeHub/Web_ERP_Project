import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

class empProofMaking extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            socialNum: "",
            address: "",
            position: "",
        }
    }

    componentDidMount(){
        const emp = window.localStorage.getItem("emp");
        console.log("tenure:" + emp)
        if(emp !== null){
            const parseEmp = JSON.parse(emp);
            this.setState(parseEmp);
            window.localStorage.removeItem("emp");
        }
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    getCurrentTimeStamp = () => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        return timestamp;
    }

    render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <br/><br/><br/>
                <Table style={{width: '700px', marginTop: '50px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeader} colSpan={2}>재직증명서</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>사번</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.employeeId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>성명</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>주민등록번호</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.socialNum}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>현주소</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>소속</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.departmentId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>직위</TableCell>
                            <TableCell style={tableBodyRight}>{this.state.position}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft}>근무기간</TableCell>
                            <TableCell style={tableBodyRight}>{this.formatDate(this.state.joinDate)} ~ {this.formatDate(this.getCurrentTimeStamp())}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyBottom} colSpan={2}>위와 같이 증명합니다.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableBodyLeft} colSpan={2}>{this.formatDate(this.getCurrentTimeStamp())}</TableCell>
                        </TableRow>
                    </TableBody>
                    
                </Table>
            </div>
        );
    }
}

const tableLine = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black'
}
const tableHeaderAdd = {
    fontWeight: 'bold',
    height: '150px',
    textAlign: 'center',
    textDecoration: 'underline',
    fontSize: '25px'
}

const tableBodyLeftAdd = {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '35%'
}

const tableBodyRightAdd = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    fontWeight: 'bold'
}

const tableBottomAdd = {
    textAlign: 'center',
    height: '200px'
}

const tableHeader = { ...tableLine, ...tableHeaderAdd}
const tableBodyLeft = { ...tableLine, ...tableBodyLeftAdd}
const tableBodyRight = { ...tableLine, ...tableBodyRightAdd}
const tableBodyBottom = { ...tableLine, ...tableBottomAdd}

export default empProofMaking;