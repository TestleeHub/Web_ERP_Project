import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class customerTradeSlip extends Component{
    state = {
        datas: [],
        displayedDatas: [],
        showMore: true,
        isLoading: true,
        slipId: "",
        tradeType: "",
        money: "",
        customerId: "",
        title: "",
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
            "/customer/tradeSlip",
            {}
        ).then((response) => {
            const filteredData = response.data.filter(item => item.tradeType === "입금");
            this.setState({
                datas: filteredData,
                displayedDatas: filteredData.slice(0, 5),
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
        window.localStorage.setItem("tradeSlipData", JSON.stringify(data));
        this.props.history.push('/customer/customerTradeSlipInsert');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/customer/tradeSlipDelete",
            {
                slipId: targetdata.slipId,
                tradeType: targetdata.tradeType,
                money: targetdata.money,
                customerId: targetdata.customerId,
                title: targetdata.title,
                regDate: targetdata.regDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.slipId !== targetdata.slipId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.slipId !== targetdata.slipId)
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
    handleSort = (columnKey) => {
        let direction = "ascending";
        
        // 클릭한 컬럼이 현재 정렬 중인 컬럼이라면, 정렬 방향을 변경합니다.
        if (this.state.sortColumn === columnKey) {
            direction = this.state.sortDirection === "ascending" ? "descending" : "ascending";
        } else {
            // 클릭한 컬럼이 현재 정렬 중인 컬럼이 아니라면, 초기 정렬 방향(오름차순)을 사용합니다.
            direction = "ascending";
        }

        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            let aValue = a[columnKey];
            let bValue = b[columnKey];
    
            // 'customer' 항목의 경우, 'name' 속성을 사용하여 정렬
            if (columnKey === 'customer') {
                aValue = aValue.name;
                bValue = bValue.name;
            }

            if (typeof aValue === 'string') {
            // 문자열의 경우, 대소문자를 구분하지 않고 정렬
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return direction === "ascending" ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    
        this.setState({ displayedDatas: sortedData, sortDirection: direction, sortColumn: columnKey });
    }
    
    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant='h4' style={style}> 거래처 입금 목록 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.customerTradeSlip}>전체</Button>
                </div>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table style={tableStyle}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell style={tableCellStyle}>

                                </TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.handleSort('slipId')} align="center">전표번호</TableCell>
                                <TableCell style={tableCellTitleStyle} align="center">거래유형</TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.handleSort('money')} align="center">금액</TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.handleSort('customer')} align="center">거래처명</TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.handleSort('title')} align="center">제목</TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.handleSort('regDate')} align="center">등록일</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.slipId} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.tradeType ? data.tradeType : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.money ? data.money.toLocaleString() : '0'}원</TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.customer ? data.customer.name : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.title ? data.title : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.regDate ? this.formatDate(data.regDate) : 'N/A'} </TableCell>
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
                <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/customer/customerTradeSlipInsert')}>신규</Button>
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerList')}>거래처목록</Button>
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
    width: '15%',
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

export default customerTradeSlip;