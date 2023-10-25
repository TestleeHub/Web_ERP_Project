import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class purchaseList extends Component{

    // 구매 목록 조회
    purchaseList = () => {
        this.props.history.push("/purchase/purchaseList");
    }

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            purchaseId: "",
            customerId: "",
            employeeId: "",
            registDate: "",
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
            "/purchase/purchaseList",
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
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("purchaseFormData", JSON.stringify(data));
        this.props.history.push('/purchase/purchaseForm');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/purchase/purchaseDelete",
            {
                purchaseId: targetdata.purchaseId,
                customerId: targetdata.customerId,
                employeeId: targetdata.employeeId,
                details: targetdata.details,
                registDate : targetdata.registDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.purchaseId !== targetdata.purchaseId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.purchaseId !== targetdata.purchaseId)
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

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // 정렬
    // 구매 번호 정렬
    sortUsingPurchaseId = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.purchaseId.localeCompare(b.purchaseId);
        });
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 거래처명 정렬
    sortUsingCustomerName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.customer.name.localeCompare(b.customer.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 원재료명 정렬
    sortUsingMaterialName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.details[0].material.name.localeCompare(b.details[0].material.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 금액 합계 정렬
    sortUsingPrice = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return (a.details[0].price * a.details[0].quantity) - (b.details[0].price * b.details[0].quantity);
        });
        this.setState({
            displayedDatas: sortedData
        });
    }

    render(){
        const { displayedDatas, showMore } = this.state;
        return(
            <div>
                <div>
                    <Typography variant="h4" style={style}>구매 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.purchaseList}>구매 목록</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                    <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                        <TableHead style={{backgroundColor: 'lightgray'}}>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingPurchaseId()} align="center">구매 번호▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingCustomerName()} align="center">거래처명▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingMaterialName()} align="center">원재료명▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} onClick={() => this.sortUsingPrice()} align="center">금액 합계▽</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">회계 반영 여부</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">추가 작업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{data.purchaseId}</TableCell>
                                    <TableCell align="center">{data.customer ? data.customer.name : 'N/A'}</TableCell>
                                    <TableCell align="center">{data.details[0].material ? data.details[0].material.name : 'N/A'}</TableCell>
                                    <TableCell align="center">
                                        {
                                            (() => {  // () => : 즉시 실행되는 함수(IIFE)
                                                const grandTotal = data.details.reduce((total, item) => { // reduce : 배열의 각 요소에 대해 함수를 실행하고 하나의 결과값을 반환하는 메서드
                                                    return total + (item.price * item.quantity);  // 각 항목의 가격과 수량을 곱한 후 누적 합산합니다.
                                                }, 0);  // 초기 total 값은 0입니다.
                                                const grandTotalNumber = parseInt(grandTotal, 10);
                                                return <div>{grandTotalNumber > 0 ? grandTotalNumber.toLocaleString()+'원' : 'N/A'}</div>;  // grandTotal 값이 0보다 큰 경우 grandTotal을 출력하고, 그렇지 않으면 'N/A'를 출력합니다.
                                            })()
                                        }
                                    </TableCell>
                                    <TableCell align="center">{data.accountReflect ? "반영 완료" : 'N/A'}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" style={updateButton} onClick={() => this.editData(data)}>수정
                                            <img className="penImage" 
                                                alt="pen" 
                                                src="../images/pen.png" 
                                                style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                            />
                                        </Button>
                                        <Button variant="contained" style={deleteButton} onClick={() => this.deleteData(data)}>삭제
                                            <img className="garbageImage" 
                                                alt="garbage" 
                                                src="../images/garbage.png" 
                                                style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                                />
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
            </div>
        );
    }
}

export default purchaseList;

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

// 수정 버튼 속성
const updateButton = {
    backgroundColor: '#FF8C0A',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
}

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
}