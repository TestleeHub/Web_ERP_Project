import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class customerTradeHistory extends Component{
    state = {
        dates: [],
        displayedDatas: [],
        showMore: true,
        isLoading : true,
        tradeHistoryId: "",
        customerId: "",
        title: "",
        income: "",
        expend: "",
        regDate: ""
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
            "/customer/tradeHistory",
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
        const { displayedDatas, showMore } = this.state;

        return(
            <div>
                <br/>
                <Typography variant='h4' style={style}> 거래처 거래내역 </Typography>
                <br/>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead style={{ backgroundColor: 'lightgray' }}>
                        <TableRow>
                            <TableCell>거래내역 Id</TableCell>
                            <TableCell>거래처</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>거래 수입금</TableCell>
                            <TableCell>거래 지줄금</TableCell>
                            <TableCell>등록일</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {this.state.displayedDatas.map((data, index) => (
                            <TableRow>
                                <TableCell> {data.tradeHistoryId} </TableCell>
                                <TableCell> {data.customer ? data.customer.name : 'N/A'} </TableCell>
                                <TableCell> {data.title ? data.title : 'N/A'} </TableCell>
                                <TableCell> {data.income ? data.income.toLocaleString() : '0'}원 </TableCell>
                                <TableCell> {data.expend ? data.expend.toLocaleString() : '0'}원 </TableCell>
                                <TableCell> {data.regDate ? this.formatDate(data.regDate) : 'N/A'} </TableCell>
                            </TableRow>    
                        ))}
                    </TableBody>
                </Table>   
                )}

                <br />
                {showMore && (
                    <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                )}
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerList')}>거래처목록</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerTradeSlip')}>입금목록</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerTradeSlip2')}>출금목록</Button>
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

export default customerTradeHistory;