import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
// import testImage from '../../image/logistics/productInsert.png'

class receiptStatus extends Component{
    render(){
        return(

            <div>
                <br/>
                    <Typography variant="h4" style={style}> 출하현황 </Typography>
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
                            <TableCell style={{border: 'none'}}> 구분 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input type="checkbox" name="color" value="blue"/> 내역
                                <input type="checkbox" name="color" value="blue" style={{marginLeft: '10px'}} /> 집계
                                <div>
                                    <input type="text" size="70" />
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>일자</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <label>
                                    <input type="date" 
                                           id="date" 
                                           max="2077-06-20" 
                                           min="2077-06-05" 
                                           value="2023-10-10"
                                    />
                                </label>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>
                                <select style={{width: '100px', height: '30px'}}>
                                    <option selected>창고</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input type="text" size="70" placeholder="창고 검색"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>
                                <select style={{width: '100px', height: '30px'}}>
                                    <option selected>거래처</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" placeholder="거래처 검색"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>
                                <select style={{width: '100px', height: '30px'}}>
                                    <option selected>제품</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" placeholder="제품 검색"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}} colspan="2">
                                <hr width="100%"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>적용양식</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" placeholder="현황"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>양식구분</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input type="checkbox" name="color" value="blue"/> 결재방표시
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>정렬/소계기준</TableCell>
                            <TableCell style={{border: 'none'}}><input type="text" size="70" placeholder="현황"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>데이터 보기 형식</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input type="checkbox" name="color" value="blue"/> 그래프로 보기
                            </TableCell>
                        </TableRow>

                    </TableHead>
                                  
                </Table>
                 
                <br/>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>검색(F8)</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>금일</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>전일</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>금주</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>전주</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>종료일</Button>
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

export default receiptStatus;