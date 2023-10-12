import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const style = {
    display: 'flex',
    justifyContent: 'left'
}

class customerList extends Component{
    state = {
        postalCode: '',
        address: '',
        isPopupOpen: false // 팝업 상태 추가
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

    // 팝업 열기
    openPopup = () => {
        this.setState({ isPopupOpen: true });
    }

    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }

    render(){
        return(
            <div><br/><br/>
                <Typography variant='h5' style={style}> 거래처 목록 </Typography>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-start">
                        <li class="page-item disabled">
                        <a class="page-link">이전</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#">다음</a>
                        </li>
                    </ul>
                </nav>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>         </TableCell>
                            <TableCell>거래처코드</TableCell>
                            <TableCell>거래처명</TableCell>
                            <TableCell>대표자명</TableCell>
                            <TableCell>전화번호</TableCell>
                            <TableCell>팩스번호</TableCell>
                            <TableCell>업종</TableCell>
                            <TableCell>유효성 체크</TableCell>
                            <TableCell>은행코드</TableCell>
                            <TableCell>계좌번호</TableCell>
                            <TableCell>우편번호</TableCell>
                            <TableCell>상세주소</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>11111111</TableCell>
                            <TableCell>(주)구로</TableCell>
                            <TableCell>김구로</TableCell>
                            <TableCell>1566-5333</TableCell>
                            <TableCell>1566-5333</TableCell>
                            <TableCell>운송업</TableCell>
                            <TableCell>y</TableCell>
                            <TableCell>1111</TableCell>
                            <TableCell>111-11-1111111</TableCell>
                            <TableCell>11111</TableCell>
                            <TableCell>서울특별시 구로구 가산동</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>22222222</TableCell>
                            <TableCell>(주)사당가구</TableCell>
                            <TableCell>이사당</TableCell>
                            <TableCell>1522-2222</TableCell>
                            <TableCell>1522-2222</TableCell>
                            <TableCell>제조업</TableCell>
                            <TableCell>y</TableCell>
                            <TableCell>2222</TableCell>
                            <TableCell>222-22-2222222</TableCell>
                            <TableCell>22222</TableCell>
                            <TableCell>서울특별시 동작구 사당동</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>33333333</TableCell>
                            <TableCell>(주)서강</TableCell>
                            <TableCell>박서강</TableCell>
                            <TableCell>1566-5701</TableCell>
                            <TableCell>1566-5701</TableCell>
                            <TableCell>서비스업</TableCell>
                            <TableCell>y</TableCell>
                            <TableCell>3333</TableCell>
                            <TableCell>333-33-3333333</TableCell>
                            <TableCell>33333</TableCell>
                            <TableCell>서울특별시 마포구 신수동</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>4</TableCell>
                            <TableCell>44444444</TableCell>
                            <TableCell>쥐마켓</TableCell>
                            <TableCell>최마켓</TableCell>
                            <TableCell>1544-4444</TableCell>
                            <TableCell>1544-4444</TableCell>
                            <TableCell>유통업</TableCell>
                            <TableCell>y</TableCell>
                            <TableCell>4444</TableCell>
                            <TableCell>444-44-4444444</TableCell>
                            <TableCell>44444</TableCell>
                            <TableCell>서울특별시 강남구 청담동</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5</TableCell>
                            <TableCell>55555555</TableCell>
                            <TableCell>KT구로지사</TableCell>
                            <TableCell>김현일</TableCell>
                            <TableCell>1555-5555</TableCell>
                            <TableCell>1555-5555</TableCell>
                            <TableCell>통신업</TableCell>
                            <TableCell>y</TableCell>
                            <TableCell>5555</TableCell>
                            <TableCell>555-55-5555555</TableCell>
                            <TableCell>5555</TableCell>
                            <TableCell>서울특별시 강남구 신사동</TableCell>
                        </TableRow> 
                    </TableBody>        
                </Table>
            <Button variant = 'contained' color='primary' onClick={this.openPopup}>신규</Button>
            <Button variant = 'contained' color='primary' onClick={this.addSample}>수정</Button>
            <Button variant = 'contained' color='primary' onClick={this.addSample}>삭제</Button>

            {/* 팝업 부분 */}
            <Dialog open={this.state.isPopupOpen} onClose={this.closePopup} fullWidth={true} maxWidth={'md'}>
                <DialogTitle>거래처 등록</DialogTitle>
                <DialogContent>
                <Table className="bordered-table" style={{ width: '100%', maxWidth: '200' }}>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.addSample} color="primary">저장</Button>
                    <Button onClick={this.addSample} color="primary" >다시 작성</Button>
                    <Button onClick={this.closePopup} color="primary">닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }

}

export default customerList;