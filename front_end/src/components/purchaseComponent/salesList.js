import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class salesList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            salesId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            accountReflect: 0,
            details: []
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

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        this.setState({ isLoading: true });
        this.reloadData();
    }

     // 데이터 요청
     reloadData = (e) => {
        request(
            "GET",
            "/purchase/salesList",
            {

            }).then((response) => {
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 5),
                    isLoading: false
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("salesData", JSON.stringify(data));
        this.props.history.push('/purchase/salesForm');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/purchase/salesDelete",
            {
                salesId: targetdata.salesId,
                customerId: targetdata.customerId,
                employeeId: targetdata.employeeId,
                details: targetdata.details,
                dueDate : targetdata.dueDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.salesId !== targetdata.salesId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.salesId !== targetdata.salesId)
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
                <div>
                    <Typography style={style}>판매 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.salesList}>전체</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.salesList}>결제중</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.salesList}>미확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.salesList}>확인</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                        <p>로딩 중...</p>
                    ) : (
                    <Table style={{marginLeft: 15}}>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">판매 번호</TableCell>
                                <TableCell align="center">거래처 코드</TableCell>
                                <TableCell align="center">품목 코드</TableCell>
                                <TableCell align="center">금액 합계</TableCell>
                                <TableCell align="center">회계 반영 여부</TableCell>
                                <TableCell align="center">추가 작업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell align="center">
                                        <input type="checkbox" /> {index + 1}
                                    </TableCell>
                                    <TableCell>{data.salesId}</TableCell>
                                    <TableCell>{data.customerId}</TableCell>
                                    <TableCell>{data.details[0].productionItemId}</TableCell>
                                    {/* 수량 * 단가 */}
                                    <TableCell>{data.details[0].price}</TableCell>
                                    <TableCell>{data.accountReflect}</TableCell>
                                    <TableCell>
                                            <Button variant="contained" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={() => this.editData(data)}>수정</Button>
                                            <Button variant="contained" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={() => this.deleteData(data)}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )}
                    {showMore && (
                     <Button variant="contained" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.handleShowMoreClick}>더 보기</Button>
                    )}
                </div>
            </div>
        );
    }
}

export default salesList;

const style = {
    display:'flex',
    justifyContent:'left',
    margin: 15
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: '#D3D3D3',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

const trapezoidButtonF = {
    backgroundColor: '#D3D3D3',
    marginLeft: 15,
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}