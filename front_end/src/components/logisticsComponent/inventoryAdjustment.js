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

class inventoryAdjustment extends Component{

    render() {
        return(
            <div><br/><br/>
                <Typography variant="h4" style={style}> 재고조정</Typography>
                <Button variant="contained" color="primary" onClick={this.addSample}>전체</Button>
                <Table border="3">
                    <TableHead>
                        <TableRow>
                            <TableCell> 제품 코드 </TableCell>
                            <TableCell> 제품명 </TableCell>
                            <TableCell> 등록일 </TableCell>
                            <TableCell> 담당자 </TableCell>
                            <TableCell> 창고 코드 </TableCell>
                            <TableCell> 장부 수량 </TableCell>
                            <TableCell> 실사 수량 </TableCell>
                            <TableCell> 이력 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell> 0011 </TableCell>
                            <TableCell> 스마트폰 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                            <TableCell> 재고 담당 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 40 </TableCell>
                            <TableCell> 0 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 0012 </TableCell>
                            <TableCell> 노트북 </TableCell>
                            <TableCell> 23/10/05 </TableCell>
                            <TableCell> 재고 담당 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 50 </TableCell>
                            <TableCell> 0 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 0013 </TableCell>
                            <TableCell> 모니터 </TableCell>
                            <TableCell> 23/10/06 </TableCell>
                            <TableCell> 재고 담당 </TableCell>
                            <TableCell> 0001 </TableCell>
                            <TableCell> 70 </TableCell>
                            <TableCell> 0 </TableCell>
                            <TableCell> 23/10/04 </TableCell>
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
                <Button variant="contained" color="primary" onClick={this.addSample}>간편 재고조정</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>단계별 재고실사</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>재고조정</Button>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}
//     render(){
//         return(
//             <div>
//                 <img src={testImage}/>
//             </div>
//         );
//     }
// }

export default inventoryAdjustment;