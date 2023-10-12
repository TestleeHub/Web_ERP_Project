// 고정자산등록, fixedAssetsAdd
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from '@mui/material';
import { Typography } from "@material-ui/core";

class fixedAssetsAdd extends Component{
    render(){
        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 고정자산 목록 & 추가 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>고정자산 리스트</Button>
                </div>
                <Table style={{borderRight: '1px solid lightgray'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 고정자산코드 </TableCell>
                            <TableCell> 고정자산명 </TableCell>
                            <TableCell> 고정자산유형 </TableCell>
                            <TableCell> 고정자산계정명 </TableCell>
                            <TableCell> 상각방법 </TableCell>
                            <TableCell> 내용연수단위 </TableCell>
                            <TableCell> 내용연수 </TableCell>
                            <TableCell> 잔존가치 </TableCell>
                            <TableCell> 감가상각계산여부 </TableCell>
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
                        </TableRow>
                    </TableBody>
                </Table>
                <br/>
                <Button variant="contained" style={normalButton}>신규</Button>
                <Button variant="contained" style={normalButton}>선택 삭제</Button>
                <Button variant="contained" style={normalButton}>닫기</Button>
                
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}> 기본 </Button>
                </div>
                <Table style={{borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>자산코드</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="자산코드 ex) 00001" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>자산명</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="자산명" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>부서</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (부서)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>고정자산유형</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (고정자산유형)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>자산계정</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[search] (자산계정)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>총 수량</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="총 수량" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>상각방법</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 정액법/정률법" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>내용연수단위</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 연/월" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>내용연수</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="숫자로 입력하세요." /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>취득원가</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="숫자로 입력하세요." /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>잔존가치</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="자동입력(취득원가/내용연수)" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>수량관리</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="[checkBox] 사용/미사용" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>고정자산 등록일</TableCell>
                            <TableCell style={{border: 'none'}}><input type="date" name="regDate" value="#" onChange="#" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>적요</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="50" placeholder="적요" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton}>저장(F8)</Button>
                <Button variant="contained" style={normalButton}>다시 작성</Button>
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

export default fixedAssetsAdd;