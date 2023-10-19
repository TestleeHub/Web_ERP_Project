import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class empList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
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
            chkpassword: "",
            joinDate: ""
        }
    }

    handleShowMoreClick = () => {
        const { datas, displayedDatas } = this.state;
        const currentLength = displayedDatas.length;
        const nextChunk = datas.slice(currentLength, currentLength + 5);
        const newDisplayedData = [...displayedDatas, ...nextChunk];
        if (newDisplayedData.length === datas.length) {
            this.setState({ showMore: false }); // 더이상 데이터를 보여줄 필요가 없으면 "더 보기" 버튼을 숨깁니다.
        }
        this.setState({ displayedDatas: newDisplayedData });
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.reloadData();
    }

    // emplist 정보
    reloadData = (e) => {
        request(
            "GET",
            "/humanResources/empList",
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 10),
                    isLoading: false
                });
                console.log('response: ', response);
            }).catch((error) => {
                console.log('error: ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })

    }
    // emp 삭제
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/humanResources/empDelete",
            {
                employeeId: targetdata.employeeId,
                name: targetdata.name,
                foreignName: targetdata.foreignName,
                socialNum: targetdata.socialNum,
                position: targetdata.position,
                leaveDate: targetdata.leaveDate,
                leaveReason: targetdata.leaveReason,
                phone: targetdata.phone,
                email: targetdata.email,
                departmentId: targetdata.departmentId,
                bankCode: targetdata.bankCode,
                account: targetdata.account,
                accountName: targetdata.accountName,
                postMail: targetdata.postMail,
                address: targetdata.address,
                salary: targetdata.salary,
                password: targetdata.password,
                chkpassword: targetdata.chkpassword,
                joinDate: targetdata.joinDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.customerId !== targetdata.customerId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.customerId !== targetdata.customerId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error: ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }
    // emp 수정
    editData = (data) => {
        console.log("data: " + data)
        window.localStorage.setItem("data", JSON.stringify(data))
        this.props.history.push('/humanResources/empAdd');
    }
    // 재직증명서
    tenure = (data) => {
        console.log("data: " + data)
        window.localStorage.setItem("emp", JSON.stringify(data))
        this.props.history.push('/humanResources/empProofMaking');
    }

    // 임시 마이페이지 회원수정
    myEdit = (Id) => {
        console.log("Id: " + Id)
        window.localStorage.setItem("Id", JSON.stringify(Id))
        this.props.history.push('/humanResources/myEdit');
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div>
                <br />
                <Typography variant="h4" style={style}> 사원 목록 </Typography>
                <br />
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell>사원번호</TableCell>
                                <TableCell>성명</TableCell>
                                <TableCell>부서코드</TableCell>
                                <TableCell>직책</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>입사일자</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell> {data.employeeId} </TableCell>
                                    <TableCell> {data.name ? data.name : 'N/A'} </TableCell>
                                    <TableCell> {data.departmentId ? data.departmentId : 'N/A'} </TableCell>
                                    <TableCell> {data.position ? data.position : 'N/A'} </TableCell>
                                    <TableCell> {data.email ? data.email : 'N/A'} </TableCell>
                                    <TableCell> {data.joinDate ? this.formatDate(data.joinDate) : 'N/A'} </TableCell>
                                    <TableCell>
                                        <Button variant="contained" style={normalButton} onClick={() => this.editData(data)}>수정</Button>
                                        <Button variant="contained" style={normalButton} onClick={() => this.deleteData(data)}>삭제</Button>
                                        <Button variant="contained" style={normalButton} onClick={() => this.tenure(data)}>재직증명서</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                )}

                <br />
                {showMore && (
                    <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                )}
                <br />
                <br />
               
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 사다리꼴 버튼 속성
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

export default empList;