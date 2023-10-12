import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";

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

class orderConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    // 발주 입력
    orderForm = () => {
        this.props.history.push("/purchase/orderForm");
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


    render() {
        return(
            <div>
                <div>
                    <Typography style={style}>승인된 발주 목록</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.orderForm}>전체</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfimING}>결제 중</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderUnchecked}>미확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderChecked}>확인</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.orderConfirm}>결제 완료</Button>
                </div>
                <div>
                    <Table>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">발주번호</TableCell>
                                <TableCell align="center">거래처명</TableCell>
                                <TableCell align="center">담당자</TableCell>
                                <TableCell align="center">품목</TableCell>
                                <TableCell align="center">납기일자</TableCell>
                                <TableCell align="center">종결여부</TableCell>
                                <TableCell align="center">진행상태</TableCell>
                                <TableCell align="center">프로젝트명</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"><input type="checkbox" /></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}
export default orderConfirm;