import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class orderList extends Component{

    // 발주 목록 조회
    orderList = () => {
        this.props.history.push("/purchase/orderList");
    }

    // 결제 중 목록 조회
     orderConfimING = () => {
        this.props.history.push("/purchase/orderConfimING");
    }

    // 미확인 목록 조회
    orderUnchecked = () => {
        this.props.history.push("/purchase/orderUnchecked");
    }

    // 확인 목록 조회
    orderChecked = () => {
        this.props.history.push("/purchase/orderChecked");
    }

    // 결제 완료 목록 조회
    orderConfirm = () => {
        this.props.history.push("/purchase/orderConfirm");
    }

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            orderFormId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            price: "",
            Progress: "",
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
            "/purchase/orderList",
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
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("orderFormData", JSON.stringify(data));
        this.props.history.push('/purchase/orderForm');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/purchase/orderDelete",
            {
                orderFormId: targetdata.orderFormId,
                customerId: targetdata.customerId,
                employeeId: targetdata.employeeId,
                details: targetdata.details,
                dueDate : targetdata.dueDate,
                price: targetdata.price,
                Progress: targetdata.Progress
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.orderFormId !== targetdata.orderFormId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.orderFormId !== targetdata.orderFormId)
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
                    <Typography style={style}>발주서 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.orderList}>전체</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfimING}>결제 중</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderUnchecked}>미확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderChecked}>확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfirm}>결제 완료</Button>
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
                                    <TableCell align="center">발주 번호</TableCell>
                                    <TableCell align="center">거래처 코드</TableCell>
                                    <TableCell align="center">담당자</TableCell>
                                    <TableCell align="center">납기일</TableCell>
                                    <TableCell align="center">금액</TableCell>
                                    <TableCell align="center">진행 상태</TableCell>
                                    <TableCell align="center">추가 작업</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.displayedDatas.map((data, index) => (
                                    <TableRow>
                                        <TableCell align="center">
                                            <input type="checkbox" /> {index + 1}
                                        </TableCell>
                                        <TableCell>{data.orderFormId}</TableCell>
                                        <TableCell>{data.customerId}</TableCell>
                                        <TableCell>{data.employeeId}</TableCell>
                                        <TableCell>{data.dueDate}</TableCell>
                                        {/* 수량 * 단가 */}
                                        <TableCell>{data.details[0].price}</TableCell> 
                                        {/* progress 조건문으로 */}
                                        <TableCell>{data.Progress}</TableCell>
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

export default orderList;