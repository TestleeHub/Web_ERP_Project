import React, { Component } from "react";
import { Table, TableBody, TableRow, TableCell, Button, TableHead } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class pwCheck extends Component{
    constructor(props) {
        super(props);

        this.state = {
            employeeId : "",
            password : "",
            
        }
    }

    componentDidMount(){
        const employeeId = window.localStorage.getItem("employeeId");
        console.log("pwCheck - employeeId:" + employeeId)
        if(employeeId !== null){
            const parseEmployeeId = JSON.parse(employeeId);
            this.state.employeeId= parseEmployeeId
            window.localStorage.removeItem("employeeId");
        }
    }

    // myEdit = (employeeId) => {
        
    //     console.log("employeeId: " + employeeId)
    //     window.localStorage.setItem("employeeId", JSON.stringify(employeeId))
    //     this.props.history.push('/humanResources/myEdit');
    // }

    onChangeHandler = (e) => {
        let fieldName = e.target.name;
        let value = e.target.value;

        console.log(fieldName)
        console.log(value)

        this.setState({
            [fieldName]: value
        });

    }

    onPwCheck = (e) => {
        e.preventDefault();
        const employeeId = this.state.employeeId;
        const pw = this.state.password;
        console.log("비밀번호 체크")
        console.log("아이디 :", employeeId)
        console.log("비밀번호 :", pw)

        request(
            "GET",
            "/humanResources/empPwCheck",
            {
                employeeId: this.state.employeeId,
                password: this.state.password
            }).then((response) => {
                console.log('response : ', response);   
                // if(pw === chkpw && pw !== "" ){
                if(pw === response.data.password){
                    console.log("비밀번호 일치")
            
                }else{
                    console.log("비밀번호 불일치")
                }
                
                // this.props.history.push('/humanResources/empList');
            }).catch((error) => {
                console.log('error : ', error); 
            })

        
    }

    render(){
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableCell>비밀번호:</TableCell>
                        <TableCell><input type="password" name="password" placeholder="비밀번호" onChange={this.onChangeHandler} value={this.state.password}/></TableCell>
                    </TableHead>
                </Table>
                <Button onClick={this.onPwCheck}>입력</Button>
            </div>
        )
    }
}

export default pwCheck;