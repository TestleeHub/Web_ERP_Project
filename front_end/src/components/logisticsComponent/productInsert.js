import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
// import testImage from '../../image/logistics/productInsert.png'

class productInsert extends Component{
    render(){
        return(

            <div><br/><br/>
                <Typography variant="h4" style={style}> 품목등록 </Typography>
                <div>
                    <Button variant="contained" color="primary" onClick={this.addSample}>기본</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>품목 정보</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>수량</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>단가</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>원가</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>부가 정보</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>관리 대상</Button>
                </div>
                {/* <img src={testImage}/> */}
                <Table border="3">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                제품 코드
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                등록일
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                담당자
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                창고 코드
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                장부 수량
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                실사 수량
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                이력
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" color="primary" onClick={this.addSample}>저장</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>다규격 품목</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>다시 작성</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>닫기</Button>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default productInsert;