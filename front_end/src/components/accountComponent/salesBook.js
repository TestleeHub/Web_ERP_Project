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
            registDate: "",
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

    // 정렬
    sortUsingSalesBookId = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.salesBookId.localeCompare(b.salesBookId);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingCustomerName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.customer.name.localeCompare(b.customer.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingTotalPrice = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.totalPrice - b.totalPrice;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingVat = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.vat - b.vat;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingRegistDate = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.registDate- b.registDate;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingEmployeeName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.employee.name.localeCompare(b.employee.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    render(){
        const { displayedDatas, showMore } = this.state;
        return(
            <div>
                <div>
                    <Typography style={style}>매출장 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.salesBookList}>전체</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                            <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                            <TableHead style={{backgroundColor: 'lightgray'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingSalesBookId()} align="center">매출장 번호▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingCustomerName()} align="center">거래처명▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">세부 내역</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingTotalPrice()} align="center">매입공급가액▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingVat()} align="center">매입 부가세▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingRegistDate()} align="center">납기일▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingEmployeeName()} align="center">최종수정자▽</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell align="center">
                                        <input type="checkbox" /> {index + 1}
                                    </TableCell>
                                    <TableCell>{data.salesBookId}</TableCell>
                                    <TableCell>{data.customer ? data.customer.name : "N/A"}</TableCell>
                                    <TableCell>{data.details && data.details.length > 0 ? data.details[0].materialId + ' 외' : ''}  {data.details ? data.details.length : 0} 건 </TableCell>
                                    <TableCell>{data.totalPrice ? data.totalPrice : "0"}원</TableCell>
                                    <TableCell>{data.vat ? data.vat : "0"}원</TableCell>
                                    <TableCell>{data.registDate ? this.formatDate(data.registDate) : "N/A"}</TableCell>
                                    <TableCell>{data.employee ? data.employee.name : "N/A"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )}
                    {showMore && (
                     <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                    )}
                </div>
            </div>
        );
    }
}

export default salesBookList;

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '40px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}
