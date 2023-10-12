// 월계표, monthlyTrialBalance
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Button, TableHead } from '@mui/material';
import { Typography } from '@material-ui/core';

class monthlyTrialBalance extends Component{
    render(){
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 월계표 조회 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>기본</Button>
                </div>
                <Table style={{borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>구분</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] (월계표/일계표)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>조회일자</TableCell>
                            <TableCell style={{border: 'none'}}><input type="date" name="inquiryDate" value="#" onChange="#" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>부서</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (모든 부서)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>기타</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] (V 결재방표시)" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton}>찾기(F3)</Button>
                <Button variant="contained" style={normalButton}>정렬</Button>
                
                <br/><br/>

                <Typography variant="h4" style={style}> 월계표 </Typography>
                <Typography variant="h10" style={style}> 회사명:(주)ERP_web </Typography>
                <Typography variant="h10" style={style}> 2023/09/01 ~ 2023/09/30 </Typography>
                <Table style={{borderRight: '1px solid lightgray'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 차변합계 </TableCell>
                            <TableCell> 차변대체(default 0, 외상거래x) </TableCell>
                            <TableCell> 차변현금(출금) </TableCell>
                            <TableCell> 계정명 </TableCell>
                            <TableCell> 대변현금(입금) </TableCell>
                            <TableCell> 대변대체(default 0, 외상거래x) </TableCell>
                            <TableCell> 대변합계 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow style={{backgroundColor: 'ghostwhite'}}>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 0 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}>  </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 0 </TableCell>
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

export default monthlyTrialBalance;