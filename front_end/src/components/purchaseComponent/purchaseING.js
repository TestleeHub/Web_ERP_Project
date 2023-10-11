import { Component } from "react";
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

class purchaseING extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    // 구매 목록 조회
    purchaseList = () => {
        this.props.history.push("/purchase/purchaseList");
    }

    // 구매 중인 목록 조회
    purchaseING = () => {
        this.props.history.push("/purchase/purchaseING");
    }

    // 구매 완료 목록 조회
    purchaseConfirm = () => {
        this.props.history.push("/purchase/purchaseConfirm");
    }

    render() {
        return(
            <div>
                <div>
                    <Typography style={style}>구매 중 목록 조회</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.purchaseList}>전체</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.purchaseING}>구매 중</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.purchaseConfirm}>구매 완료</Button>
                </div>
                <div>
                    <Table style={{marginLeft: 15}}>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">구매 번호</TableCell>
                                <TableCell align="center">거래처 코드</TableCell>
                                <TableCell align="center">원재료 코드</TableCell>
                                <TableCell align="center">금액 합계</TableCell>
                                <TableCell align="center">회계 반영 여부</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell>{/* 발주 번호 클릭시 발주서 수정 화면 */}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
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
export default purchaseING;