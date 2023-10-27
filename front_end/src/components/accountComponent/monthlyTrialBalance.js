// 월계표, monthlyTrialBalance
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Button, TableHead } from '@mui/material';
import { Typography } from '@material-ui/core';
import { request } from "../../helpers/axios_helper";

class monthlyTrialBalance extends Component{

    // 일계표 목록 조회
    monthlyTrialBalance = () => {
        this.props.history.push("/account/monthlyTrialBalance");
    }

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            monthlyTrialId: "",
            registDate: "",
            debitTotal: "",
            creditTotal: "",
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
            "/account/monthlyTrialBalance",
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

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        // const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}`; //`${year}-${month}-${day}`
    }

    // 정렬
    // 계정명 정렬
    sortUsingAccountingTitle = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.details[0].accountingTitle.localeCompare(b.details[0].accountingTitle);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    render() {
        const { displayedDatas, showMore } = this.state;
        return (
            <div>
                <div>
                    <Typography variant="h4" style={style}>월계표 조회</Typography>
                </div>
                <br />

                <div>
                    {this.state.isLoading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <div>
                            {this.state.displayedDatas.map((data, index) => (
                                <div>
                                    <div style={divLineStyle}>
                                        <Button variant="contained" style={trapezoidButton}>{this.formatDate(data.registDate)}</Button>
                                    </div>
                                    <Table style={tableStyle}>
                                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                                            <TableRow>
                                                <TableCell style={tableCellTitleStyle} align="center">차변합계</TableCell>
                                                <TableCell style={tableCellTitleStyle} align="center">차변대체</TableCell>
                                                <TableCell style={tableCellTitleStyle} align="center">차변현금(출금)</TableCell>
                                                <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAccountingTitle()} align="center">계정명▽</TableCell>
                                                <TableCell style={tableCellTitleStyle} align="center">대변현금(입금)</TableCell>
                                                <TableCell style={tableCellTitleStyle} align="center">대변대체</TableCell>
                                                <TableCell style={tableCellTitleStyle} align="center">대변합계</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.details.map((detail, index) => (
                                                <TableRow>
                                                    <TableCell style={tableCellTitleStyle}>{detail ? (detail.debitSubstitution + detail.debitCash).toLocaleString() : '0'}원</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail.debitSubstitution ? detail.debitSubstitution.toLocaleString() : '0'}원</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail.debitCash ? detail.debitCash.toLocaleString() : '0'}원</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail.accountingTitle ? detail.accountingTitle : 'N/A'}</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail.creditCash ? detail.creditCash.toLocaleString() : '0'}원</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail.creditSubsitution ? detail.creditSubsitution.toLocaleString() : '0'}원</TableCell>
                                                    <TableCell style={tableCellTitleStyle}>{detail ? (detail.creditCash + detail.creditSubsitution).toLocaleString() : '0'}원</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableBody>
                                            <TableCell style={tableCellTitleStyle}>{data ? data.debitTotal.toLocaleString() : '0'}원</TableCell>
                                            <TableCell style={tableCellTitleStyle}>{data ? data.debitTotal.toLocaleString() : '0'}원</TableCell>
                                            <TableCell style={tableCellTitleStyle}></TableCell>
                                            <TableCell style={tableCellTitleStyle}>[합계]</TableCell>
                                            <TableCell style={tableCellTitleStyle}></TableCell>
                                            <TableCell style={tableCellTitleStyle}>{data ? data.creditTotal.toLocaleString() : '0'}원</TableCell>
                                            <TableCell style={tableCellTitleStyle}>{data ? data.creditTotal.toLocaleString() : '0'}원</TableCell>
                                        </TableBody>
                                    </Table>
                                    <br /><br />
                                </div>
                            ))}
                        </div>
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
export default monthlyTrialBalance;