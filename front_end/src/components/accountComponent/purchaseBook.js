// 매입장, purchaseBook
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from '@mui/material';
import { Typography } from "@material-ui/core";

class purchaseBook extends Component{
    render(){
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 매입장 조회 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>기본</Button>
                </div>
                <Table style={{borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>매출/매입구분</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 매출/매입/매출집계/매입집계/매입&매출" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>기준일자(납기일)</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] 연도 / 월 / 일 ~ 연도 / 월 / 일 [calendar]" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>부서</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] (부서)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>거래처</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] (거래처)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>최종수정자</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] (최종수정자)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>회계전표No.</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] (V 결재방표시)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>기타</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[selectBox] (회계전표No.)" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton}>찾기(F3)</Button>
                <Button variant="contained" style={normalButton}>정렬</Button>
                
                <br/><br/>

                <Typography variant="h4" style={style}> 매입장 </Typography>
                <Typography variant="h10" style={style}> 회사명:(주)ERP_web </Typography>
                <Typography variant="h10" style={style}> 2023/09/01 ~ 2023/09/30 </Typography>
                <Table style={{borderRight: '1px solid lightgray'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 일자-No. </TableCell>
                            <TableCell> 유형명 </TableCell>
                            <TableCell> 거래처명 </TableCell>
                            <TableCell> 세부내역 </TableCell>
                            <TableCell> 매입공급가액 </TableCell>
                            <TableCell> 매입부가세(부가세 계산하는 함수 사용? 매출공급가액*(부가세 산정식)) </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow style={{backgroundColor: 'ghostwhite'}}>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br/>
                
                <Button variant="contained" style={normalButton}>인쇄</Button>
                <Button variant="contained" style={normalButton}>리스트</Button>
                <Button variant="contained" style={normalButton}>닫기</Button>
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
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

export default purchaseBook;