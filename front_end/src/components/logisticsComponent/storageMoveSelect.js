import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
// import { withStyles } from '@material-ui/core/styles';
// import testImage from '../../image/logistics/inventoryAdjustment.png'
// import {Create, Delete} from '@mui/icons-material';

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

// 창고이동조회(storageMoveSelect) => 창고 조회(storageSelect)로 변경
class storageMoveSelect extends Component{
    
    render() {
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}>창고조회</Typography>
                <br/>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>결재중</Button>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>미확인</Button>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>확인</Button>
                <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 이동 번호 </TableCell>
                            <TableCell> 보내는 창고명 </TableCell>
                            <TableCell> 받는 창고명 </TableCell>
                            <TableCell> 제품 </TableCell>
                            <TableCell> 수량 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell> 2023/10/10 </TableCell>
                            <TableCell> 0111 </TableCell>
                            <TableCell> 0112 </TableCell>
                            <TableCell> 전자제품 </TableCell>
                            <TableCell> 10 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 2023/10/10 </TableCell>
                            <TableCell> 0112 </TableCell>
                            <TableCell> 0113 </TableCell>
                            <TableCell> 가전제품 </TableCell>
                            <TableCell> 5 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 2023/10/10 </TableCell>
                            <TableCell> 0112 </TableCell>
                            <TableCell> 0113 </TableCell>
                            <TableCell> 생활제품 </TableCell>
                            <TableCell> 4 </TableCell>
                        </TableRow> 
                        <TableRow>
                            <TableCell> 2023/10/10 </TableCell>
                            <TableCell> 0112 </TableCell>
                            <TableCell> 0113 </TableCell>
                            <TableCell> 생활제품 </TableCell>
                            <TableCell> 3 </TableCell>
                        </TableRow> 
                    </TableBody>
                </Table>
                <br/>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>신규(F2)</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>전자결재</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>선택삭제</Button>
            </div>
        );
    }
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
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '30px',
    padding: '10px 20px'
}

export default storageMoveSelect;