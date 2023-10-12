// 고정자산목록, fixedAssetsList
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from '@mui/material';
import { Typography } from "@material-ui/core";

class fixedAssetsList extends Component{
    render(){
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 고정자산대장 조회 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>기본</Button>
                </div>
                <Table style={{borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>조회일자</TableCell>
                            <TableCell style={{border: 'none'}}><input type="date" name="dateOfInquiry" value="#" onChange="#" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>부서</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (부서)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>고정자산계정</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (고정자산계정)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>고정자산</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (고정자산)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>감가상각계산여부</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 전체/계산/계산안함" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>상태</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 전체/보유/상각완료" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}} colSpan={2}>양식 _____________________________________________________________________________ </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>최종수정자</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="(jsp기준)sessionID로 호출했듯이..." /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>적용양식</TableCell>
                            <TableCell style={{border: 'none'}}>현황</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>데이터 보기형식</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (양식/그래프..?)" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton}>찾기(F8)</Button>
                <Button variant="contained" style={normalButton}>금일</Button>
                <Button variant="contained" style={normalButton}>전일</Button>
                <Button variant="contained" style={normalButton}>금주(~오늘)</Button>
                <Button variant="contained" style={normalButton}>전주</Button>
                <Button variant="contained" style={normalButton}>금월(~오늘)</Button>
                <Button variant="contained" style={normalButton}>전월</Button>
                <Button variant="contained" style={normalButton}>금년</Button>
                <Button variant="contained" style={normalButton}>전년</Button>
                <Button variant="contained" style={normalButton}>종료일</Button>
                <Button variant="contained" style={normalButton}>설정</Button>
                <Button variant="contained" style={normalButton}>다시 작성</Button>
                <br/><br/>

                <Typography variant="h4" style={style}> 고정자산대장 </Typography>
                <Typography variant="h10" style={style}> 회사명:(주)ERP_web </Typography>
                <Typography variant="h10" style={style}> 2023/09/30 </Typography>
                <Table style={{borderRight: '1px solid lightgray'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 고정자산계정명 </TableCell>
                            <TableCell> 고정자산코드 </TableCell>
                            <TableCell> 고정자산명 </TableCell>
                            <TableCell> 취득일자 </TableCell>
                            <TableCell> 수량 </TableCell>
                            <TableCell> 취득원가 </TableCell>
                            <TableCell> 감가상각충당금 </TableCell>
                            <TableCell> 적요 </TableCell>
                            <TableCell> 상태 </TableCell>
                            <TableCell> 감가상각계산여부 </TableCell>
                            <TableCell> 상세내역 </TableCell>
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

export default fixedAssetsList;