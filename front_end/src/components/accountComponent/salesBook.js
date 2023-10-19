import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class salesBookList extends Component{

    // 판매 목록 조회
    salesBookList = () => {
        this.props.history.push("/account/salesBook");
    }

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
            details: [], //Sales_DetailDTO를 배열로 생성 및 선언
            totalPrice: "",	
            vat: "",
            salesBookId: ""
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
            "/account/salesBook",
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
                <div>
                    <Typography style={style}>매출장 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.salesBookList}>전체</Button>
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
                                <TableCell align="center">매출장 번호</TableCell>
                                <TableCell align="center">거래처 코드</TableCell>
                                <TableCell align="center">세부 내역</TableCell>
                                <TableCell align="center">매출공급가액</TableCell>
                                <TableCell align="center">매출 부가세</TableCell>
                                <TableCell align="center">납기일</TableCell>
                                <TableCell align="center">최종수정자</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell align="center">
                                        <input type="checkbox" /> {index + 1}
                                    </TableCell>
                                    <TableCell>{data.salesBookId}</TableCell>
                                    <TableCell>{data.customerId ? data.customerId : "N/A"}</TableCell>
                                    <TableCell>{data.details && data.details.length > 0 ? data.details[0].productionItemId + ' 외' : ''}  {data.details ? data.details.length : 0} 건 </TableCell>
                                    <TableCell>{data.totalPrice ? data.totalPrice : "0"}원</TableCell>
                                    <TableCell>{data.vat ? data.vat : "0"}원</TableCell>
                                    <TableCell>{data.dueDate ? this.formatDate(data.dueDate) : "N/A"}</TableCell>
                                    <TableCell>{data.employeeId ? data.employeeId : "N/A"}</TableCell>
                                    <TableCell>  </TableCell>
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

export default salesBookList;

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