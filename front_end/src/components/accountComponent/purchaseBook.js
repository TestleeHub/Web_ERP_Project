import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";

class purchaseBookList extends Component{

    // 구매 목록 조회
    purchaseBookList = () => {
        this.props.history.push("/account/purchaseBook");
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
            details: [], //Purchase_DetailDTO를 배열로 생성 및 선언
            totalPrice: "",	
            vat: "",
            purchaseBookId: ""
        }
    }

    handleShowMoreClick = () => {
        const { datas, displayedDatas } = this.state;
        const currentLength = displayedDatas.length;
        const nextChunk = datas.slice(currentLength, currentLength + 5);
        const newDisplayedData = [...displayedDatas, ...nextChunk];
        if (newDisplayedData.length === datas.length) {
            this.setState({ showMore: false }); // 모든 데이터 출력시, "더보기 버튼" 숨김
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
            "/account/purchaseBook",
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

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // 정렬
    sortUsingPurchaseBookId = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.purchaseBookId.localeCompare(b.purchaseBookId);
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
            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant="h4" style={style}>매입장 조회</Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                <Button variant="contained" style={trapezoidButton} onClick={this.purchaseList}>전체</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                        <Table style={tableStyle}>
                            <TableHead style={{backgroundColor: 'lightgray'}}>
                                <TableRow>
                                    <TableCell style={tableCellStyle}>

                                    </TableCell>    
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingPurchaseBookId()} align="center">매입장 번호▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingCustomerName()} align="center">거래처명▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">세부 내역</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingTotalPrice()} align="center">매입공급가액▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingVat()} align="center">매입 부가세▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingRegistDate()} align="center">납기일▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingEmployeeName()} align="center">최종수정자▽</TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }} align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.purchaseBookId}</TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.customer ? data.customer.name : "N/A"}</TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.details && data.details.length > 0 ? data.details[0].material.name + ' 외' : ''}  {data.details ? data.details.length : 0} 건 </TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.totalPrice ? data.totalPrice : "0"}원</TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.vat ? data.vat : "0"}원</TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.registDate ? this.formatDate(data.registDate) : "N/A"}</TableCell>
                                    <TableCell style={tableCellTitleStyle}>{data.employee ? data.employee.name : "N/A"}</TableCell>
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

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '14%',
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
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
};

export default purchaseBookList;
