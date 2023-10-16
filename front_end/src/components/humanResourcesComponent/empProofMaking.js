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

    render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Table style={{ backgroundColor: 'lightgray', width: '700px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', textDecoration: 'underline', height: '100px'}} colSpan={2}>재직증명서</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', width: '35%', borderRight: '1px solid black'}}>성명</TableCell>
                            <TableCell>{this.state.employeeId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', borderRight: '1px solid black'}}>주민등록번호</TableCell>
                            <TableCell>{this.state.socialNum}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', borderRight: '1px solid black'}}>현주소</TableCell>
                            <TableCell>{this.state.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', borderRight: '1px solid black'}}>소속</TableCell>
                            <TableCell>{this.state.departmentId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', borderRight: '1px solid black'}}>직위</TableCell>
                            <TableCell>{this.state.position}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', borderRight: '1px solid black'}}>근무기간</TableCell>
                            <TableCell>{this.formatDate(this.state.joinDate)} ~ </TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default empProofMaking;