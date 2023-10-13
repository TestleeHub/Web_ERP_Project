import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
// import testImage from '../../image/logistics/productInsert.png'

// 봉인
class productInsert extends Component{
    render(){
        return(

            <div>
                <br/>
                    <Typography variant="h4" style={style}> 품목등록 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>기본</Button>
                    {/* <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>품목 정보</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>수량</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>단가</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>원가</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>부가 정보</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>관리 대상</Button> */}
                </div> 
                <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 제품 코드 </TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>제품명</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>제품 구분</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 원재료
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 부재료
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 제품
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 반제품
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 상품
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 무형상품
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>등록일</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>담당자</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>창고 코드</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>장부 수량</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>실사 수량</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>이력</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <br/>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>다규격 품목</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>다시 작성</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>닫기</Button>
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


export default productInsert;