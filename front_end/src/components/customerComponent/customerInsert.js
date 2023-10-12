import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Tab } from '@mui/material';

const style = {
    display: 'flex',
    justifyContent: 'left'
}

class customerInsert extends Component{
    state = {
        postalCode: '',
        address: ''
    }

    searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                this.setState({
                    postalCode: data.zonecode,
                    address: data.address
                });
            }
        }).open();
    }
    
    render(){
        return(
            <div><br/><br/>
                <Typography variant="h5" style={style}> 거래처 등록 </Typography>
                <div>
                    <Button variant="contained" color="primary" onClick={this.addSample}>기본</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>거래처정보</Button>
                    <Button variant="contained" color="primary" onClick={this.addSample}>부가정보</Button>
                </div>

                <Table border="3">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                거래처코드
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                거래처명(이름)
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                거래처코드 구분
                            </TableCell>     
                            <TableCell colSpan={3}>
                                <label style={{ marginRight: '15px' }}>
                                    <input type="radio" name="customer" value="사업자" checked />사업자
                                </label>
                                <label style={{ marginRight: '15px' }}>
                                    <input type="radio" name="customer" value="비사업자(내국인)" />비사업자(내국인)
                                </label>
                                <label>
                                    <input type="radio" name="customer" value="비사업자(외국인)" />비사업자(외국인)
                                </label>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                대표자명
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                               전화번호
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                팩스번호
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                업종
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                은행코드
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                계좌번호
                            </TableCell>
                            <TableCell>
                                <input type="text" size="70" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                우편번호
                            </TableCell>
                            <TableCell>
                                <Button onClick={this.searchAddress}>주소검색</Button>
                                <input type="text" value={this.state.postalCode} size="60" readOnly />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                상세주소
                            </TableCell>
                            <TableCell>
                                <input type="text" value={this.state.address} size="70" readOnly />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" color="primary" onClick={this.addSample}>저장</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>다시 작성</Button>
                <Button variant="contained" color="primary" onClick={this.addSample}>닫기</Button>
            </div>

        )
    }
}

export default customerInsert;