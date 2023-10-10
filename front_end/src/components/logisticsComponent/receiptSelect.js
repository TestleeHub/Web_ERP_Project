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

class receiptSelect extends Component{

    render() {
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 출하조회 </Typography>
                <br/>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 출고 코드 </TableCell>
                            <TableCell> 일자 </TableCell>
                            <TableCell> 창고 코드 </TableCell>
                            <TableCell> 제품 코드 </TableCell>
                            <TableCell> 수량 합계 </TableCell>
                            <TableCell> 거래처명 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell> 0111 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 0011 </TableCell>
                            <TableCell> 100 </TableCell>
                            <TableCell> 애플 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 0111 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 0012 </TableCell>
                            <TableCell> 40 </TableCell>
                            <TableCell> 삼성 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 0111 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 0013 </TableCell>
                            <TableCell> 40 </TableCell>
                            <TableCell> LG </TableCell>
                        </TableRow> 
                        {/* {this.state.samples.map(sample => 
                            <TableRow key={sample.id}>
                                <TableCell component="th" scope="sample">{sample.id}</TableCell>
                                <TableCell>{sample.name}</TableCell>
                                <TableCell>{sample.brand}</TableCell>
                                <TableCell>{sample.madein}</TableCell>
                                <TableCell>{sample.price}</TableCell>

                                <TableCell onClick={() => this.editSample(sample.id)}>
                                    <Create />
                                </TableCell>

                                <TableCell onClick={() => this.deleteSample(sample.id)}>
                                    <Delete />
                                </TableCell>

                            </TableRow>    
                        )} */}
                    </TableBody>
                </Table>
                <br/>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>신규(F2)</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>선택삭제</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>이력조회</Button>
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

export default receiptSelect;