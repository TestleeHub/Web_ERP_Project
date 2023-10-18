import React, { Component } from "react";
import { Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";
import EmployeePopup from "../popUp/employeePopup";
import Modal from 'react-modal';

class empAdd extends Component{
    constructor(props) {
        super(props);

        this.state = {
            // salayNum: "",
            employeeId: "",     // 회원아이디
            overtimePay: "",    // 야간수당
            weekendPay: "",     // 주말수당
            vacationPay: "",    // 연차수당
            paymentDate: "",    // 지급일
            isEmployeePopupOpen: false,
            isStoregePopupOpen: false
        }
    }

    // 팝업 열기
    openEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: true });
    }
    // 팝업 닫기
    closeEmployeePopup = () => {
        this.setState({ isEmployeePopupOpen: false });
    }
    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handleEmployeePopupData = (data) => {
        this.setState({ employeeId: data.employeeId, isEmployeePopupOpen: false });
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

    // 급여 추가
    onSubmitAdd = (e) => {
        e.preventDefault();
        
        request(
            "POST",
            "/humanResources/salaryAdd",
            {
                // salayNum: this.state.salayNum,
                employeeId: this.state.employeeId,
                overtimePay: this.state.overtimePay,
                weekendPay: this.state.weekendPay,
                vacationPay: this.state.vacationPay,
                paymentDate: this.state.paymentDate,
                
            }).then((response) => {
                console.log('response : ', response);   
                this.props.history.push('/humanResources/SalaryStateSelect');
            }).catch((error) => {
                console.log('error : ', error); 
            })
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

    render(){
        return(
            <div>
                {/* 팝업 */}
                <div>
                    <Modal
                        isOpen={this.state.isEmployeePopupOpen}
                        onRequestClose={this.closeEmployeePopup}
                        contentLabel="팝업"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '700px', // 원하는 폭으로 설정
                                height: '400px', // 원하는 높이로 설정
                                top: '50%', // 원하는 수직 위치로 설정
                                left: '55%', // 원하는 수평 위치로 설정
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <EmployeePopup onPopupData={this.handleEmployeePopupData} />

                        <button onClick={this.closeEmployeePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Button style={trapezoidButton}>급여등록</Button>
                </div>
                <div>               
                    <Table style={{ backgroundColor: 'ghostwhite'}}>
                        <TableBody>
                            {/* <TableRow>
                                <TableCell >급여번호</TableCell>
                                <TableCell >
                                    <input 
                                    type="text" 
                                    name="salayNum" 
                                    placeholder="급여번호" 
                                    onChange={this.onChangeEmpHandler} 
                                    value={this.state.salayNum}/>
                                </TableCell>
                            </TableRow> */}
                            <TableRow>
                                
                                <TableCell >지급일</TableCell>
                                <TableCell >
                                    <input 
                                        type="date" 
                                        name="paymentDate" 
                                        placeholder="지급일" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.paymentDate}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >사원ID</TableCell>
                                <TableCell >
                                    <input 
                                        type="text" 
                                        name="employeeId" 
                                        placeholder="사원ID"
                                        onChange={this.onChangeEmpHandler} 
                                        onClick={this.openEmployeePopup}
                                        value={this.state.employeeId}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >야근수당</TableCell>
                                <TableCell >
                                    <input 
                                        type="text" 
                                        name="overtimePay" 
                                        placeholder="야근수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.overtimePay}/>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >주말근무수당</TableCell>
                                <TableCell >
                                    <input 
                                        type="text" 
                                        name="weekendPay" 
                                        placeholder="주말근무수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.weekendPay}/>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >연차수당</TableCell>
                                <TableCell >
                                    <input 
                                        type="text" 
                                        name="vacationPay" 
                                        placeholder="연차수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.vacationPay}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <hr />
                    <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>등록</Button>
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