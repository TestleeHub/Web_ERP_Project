import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";

class customerList extends Component {
    state = {
        datas: [],
        displayedDatas: [],
        showMore: true,
        isLoading: true,
        customerId: "",
        name: "",
        ceoName: "",
        phone: "",
        faxNumber: "",
        type: "",
        bank: "",
        account: "",
        postMail: "",
        address: ""
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

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        this.setState({ isLoading: true });
        this.reloadData();
    }

    // 데이터 요청
    reloadData = (e) => {
        request(
            "GET",
            "/customer/customerList",
            {

            }).then((response) => {
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 10),
                    isLoading: false
                });
                console.log('response : ', response);
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

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("customerData", JSON.stringify(data));
        this.props.history.push('/customer/customerInsert');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/customer/customerDelete",
            {
                customerId: targetdata.customerId,
                name: targetdata.name,
                ceoName: targetdata.ceoName,
                phone: targetdata.phone,
                faxNumber: targetdata.faxNumber,
                type: targetdata.type,
                bank: targetdata.bank,
                account: targetdata.account,
                postMail: targetdata.postMail,
                address: targetdata.address
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.customerId !== targetdata.customerId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.customerId !== targetdata.customerId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant="h4" style={style}> 거래처 목록 </Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                <Button variant="contained" style={trapezoidButton} onClick={this.customerList}>전체</Button>
                </div>
                <div>
                    {/* 로딩 상태에 대한 조건부 렌더링 */}
                    {this.state.isLoading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <Table style={tableStyle}>
                            <TableHead style={{ backgroundColor: 'lightgray' }}>
                                <TableRow>
                                    <TableCell style={tableCellStyle}>

                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">거래처코드</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">거래처명</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">대표자명</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">전화번호</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">팩스번호</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">업종</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">우편번호</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">상세주소</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">추가작업</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.state.displayedDatas.map((data, index) => (
                                    <TableRow>
                                        <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }}>
                                                {index + 1}
                                        </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.customerId} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.name ? data.name : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.ceoName ? data.ceoName : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.phone ? data.phone : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.faxNumber ? data.faxNumber : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.type ? data.type : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.postMail ? data.postMail : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}> {data.address ? data.address : 'N/A'} </TableCell>
                                        <TableCell style={tableCellTitleStyle}>
                                            <div style={{paddingBottom: '8px'}}>
                                            <Button variant="contained" style={updateButton} onClick={() => this.editData(data)}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    수정
                                                    <img className="penImage" 
                                                        alt="pen" 
                                                        src="../images/pen.png" 
                                                        style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                                    />
                                                </div>
                                            </Button>
                                            </div>
                                            <Button variant="contained" style={deleteButton} onClick={() => this.deleteData(data)}> 
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    삭제
                                                    <img className="garbageImage" 
                                                        alt="garbage" 
                                                        src="../images/garbage.png" 
                                                        style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                                    />
                                                </div>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {showMore && (
                        <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                    )}
                </div>
                <br/>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerInsert')}>신규</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerTradeHistory')}>거래내역</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerTradeSlip')}>입금목록</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerTradeSlip2')}>출금목록</Button>
            </div>
        );
    }

}

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '10%',
    fontSize: '20px',
    paddingLeft: '30px',
    textAlign: 'center'
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

export default customerList;