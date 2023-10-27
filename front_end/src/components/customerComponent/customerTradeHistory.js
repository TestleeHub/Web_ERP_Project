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
        regDate: "",
        sortDirection: "ascending",  // 클릭 시 초기 정렬은 오름차순
        sortColumn: ""               // 정렬되는 컬럼명을 저장
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

    // 항목 정렬
    // 각 항목을 클릭할 때마다 오름차순과 내림차순 번갈아 정렬
    // 클릭할 때마다 다른 항목에 간섭하지 않고 한번에 한 항목씩만 정렬하는 방법
    handleSort = (columnKey, isString = false, isDate = false) => {
        let direction = "ascending"; 

        // 클릭된 컬럼이 이전에 정렬된 컬럼과 같으면 정렬 방향을 반전
        if (this.state.sortColumn === columnKey) {
            direction = this.state.sortDirection === "ascending" ? "descending" : "ascending";
        }

        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            let keys = columnKey.split('.'); 
            let aValue = keys.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, a);
            let bValue = keys.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, b);

            if (isDate) {
                return direction === "ascending" ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
            } else if (isString) {
                if (!aValue) aValue = '';
                if (!bValue) bValue = '';
                return direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return direction === "ascending" ? aValue - bValue : bValue - aValue;
            }
        });
        
        // 상태 업데이트: 정렬된 데이터와, 정렬 방향, 정렬된 컬럼
        this.setState({ displayedDatas: sortedData, sortDirection: direction, sortColumn: columnKey });
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
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('tradeHistoryId', true)} align="center">거래내역 Id▽</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('customer.name', true)} align="center">거래처명▽</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('title', true)} align="center">제목▽</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('income')} align="center">거래 수입금▽</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('expend')} align="center">거래 지줄금▽</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} onClick={() => this.handleSort('regDate', false, true)} align="center">등록일▽</TableCell>
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