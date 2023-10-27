import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";
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
                if(error.response.status === 403){
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                    window.location.reload();
                }else if(error.response.status === 401){
                    alert('로그인이 필요합니다.')
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    this.props.history.push('/login');
                    window.location.reload();
                }
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
            <div style={{padding: '30px'}}>
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
                    <Typography variant="h4" style={style}> 사원 등록 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button style={trapezoidButton}>급여등록</Button>
                </div>
                <div>               
                    <Table style={tableStyle}>
                        <TableHead>
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
                                <TableCell style={tableCellTitleStyle}>지급일</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={shortInputStyle}
                                        type="date" 
                                        name="paymentDate" 
                                        placeholder="지급일" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.paymentDate}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>사원ID</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={longInputStyle}
                                        type="text" 
                                        name="employeeId" 
                                        placeholder="사원ID"
                                        onChange={this.onChangeEmpHandler} 
                                        onClick={this.openEmployeePopup}
                                        value={this.state.employeeId}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>야근수당</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={longInputStyle}
                                        type="text" 
                                        name="overtimePay" 
                                        placeholder="야근수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.overtimePay}/>
                                    </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>주말근무수당</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={longInputStyle}
                                        type="text" 
                                        name="weekendPay" 
                                        placeholder="주말근무수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.weekendPay}/>
                                    </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>연차수당</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={longInputStyle}
                                        type="text" 
                                        name="vacationPay" 
                                        placeholder="연차수당" 
                                        onChange={this.onChangeEmpHandler} 
                                        value={this.state.vacationPay}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>등록</Button>
                </div>
            </div>
        );
    }
}

export default empAdd;

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    paddingLeft: '30px',
    textAlign: 'left',
    border: 'none'
}

// 테이블 셀 스타일
const tableCellStyle = {
    fontSize: '20px',
    border: 'none'
}

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 500px input 창
const longInputStyle = {
    width: '500px',
    height: '50px',
    padding: '5px 10px',
};

// 300px input 창
const shortInputStyle = {
    width: '300px',
    height: '50px',
    padding: '5px 10px',
};

const labelStyle = {
    fontSize: '20px',
    display: 'flex',
    float: 'left',
    alignItems: 'center',
    paddingRight: '20px'
};

const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

const divLineStyle = {
    borderBottom: '3px solid navy'
};

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '160px',
    height: '50px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    fontSize: '18px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px'
}

// 수정 버튼 속성
const updateButton = {
    backgroundColor: '#FF8C0A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};