import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class orderList extends Component {

    // 발주 목록 조회
    orderList = () => {
        this.props.history.push("/purchase/orderList");
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
            progress: "",
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
                    displayedDatas: response.data.slice(0, 10),
                    isLoading: false
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
                if (error.response.status === 403) {
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
                dueDate: targetdata.dueDate,
                price: targetdata.price,
                progress: targetdata.progress
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

    // 정렬 this.state.displayedDatas.slice() 통해 displayedDatas의 배열 복사 => slice()는 배열을 복제하는 메서드로, 이를 통해 원본 배열은 수정되지 않음
    // 발주번호 기준 정렬
    sortUsingOrderFormId = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.orderFormId.localeCompare(b.orderFormId);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 거래처명 기준 정렬
    sortUsingCustomerName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.customer.name.localeCompare(b.customer.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 담당자 기준 정렬
    sortUsingEmployeeName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.employee.name.localeCompare(b.employee.name);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    // 납기일 기준 정렬
    sortUsingDueDate = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.dueDate - b.dueDate;
        });
        this.setState({
            displayedDatas: sortedData
        });
    }

    // 금액 기준 정렬
    sortUsingPrice = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return (a.details[0].price * a.details[0].quantity) - (b.details[0].price * b.details[0].quantity);
        });
        this.setState({
            displayedDatas: sortedData
        });
    }

    render() {
        const { displayedDatas, showMore } = this.state;
        return (
            <div>
                <div>
                    <Typography variant="h4" style={style}>발주서 조회</Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderList}>발주 목록</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <Table style={tableStyle}>
                            <TableHead style={{ backgroundColor: 'lightgray' }}>
                                <TableRow>
                                    <TableCell style={tableCellStyle}>

                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingOrderFormId()} align="center">발주 번호▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingCustomerName()} align="center">거래처명▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingEmployeeId()} align="center">담당자▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingDueDate()} align="center">납기일▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingPrice()} align="center">금액▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">진행 상태</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">추가 작업</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.displayedDatas.map((data, index) => (
                                    <TableRow>
                                        <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.orderFormId}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.customer ? data.customer.name : 'N/A'}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.employeeId ? data.employeeId : 'N/A'}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{this.formatDate(data.dueDate)}</TableCell>
                                        {/* 수량 * 단가 */}
                                        <TableCell style={tableCellTitleStyle}>
                                            {
                                                (() => {
                                                    const grandTotal = data.details.reduce((total, item) => {
                                                        return total + (item.price * item.quantity);
                                                    }, 0);
                                                    const grandTotalNumber = parseInt(grandTotal, 10);
                                                    return <div>{grandTotalNumber > 0 ? grandTotalNumber.toLocaleString() + '원' : 'N/A'}</div>;
                                                })()
                                            }
                                        </TableCell>
                                        {/* progress 조건문으로 */}
                                        <TableCell style={tableCellTitleStyle}>{data.Progress ? data.Progress : 'N/A'}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>
                                            <Button variant="contained" style={updateButton} onClick={() => this.editData(data)}>수정
                                                <img className="penImage"
                                                    alt="pen"
                                                    src="../images/pen.png"
                                                    style={{ marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)' }}
                                                />
                                            </Button>
                                            <Button variant="contained" style={deleteButton} onClick={() => this.deleteData(data)}>삭제
                                                <img className="garbageImage"
                                                    alt="garbage"
                                                    src="../images/garbage.png"
                                                    style={{ marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)' }}
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

export default orderList;