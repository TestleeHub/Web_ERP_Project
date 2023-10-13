import React, { Component } from "react";
// import testImage from '../../image/customerTest/customerTradeSlipSample.PNG'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const style = {
    display: 'flex',
    justifyContent: 'left'
}

class customerTradeSlip extends Component{
    // render(){
    //     return(
    //         <div>
    //             <img src={testImage}/>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div><br/><br/>
                <Typography variant='h5' style={style}> 거래처 입금 </Typography>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-start">
                        <li className="page-item disabled">
                        <a className="page-link">이전</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">6</a></li>
                        <li className="page-item"><a className="page-link" href="#">7</a></li>
                        <li className="page-item"><a className="page-link" href="#">8</a></li>
                        <li className="page-item"><a className="page-link" href="#">9</a></li>
                        <li className="page-item"><a className="page-link" href="#">10</a></li>
                        <li className="page-item">
                        <a className="page-link" href="#">다음</a>
                        </li>
                    </ul>
                </nav>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>         </TableCell>
                            <TableCell>전표번호</TableCell>
                            <TableCell>거래유형</TableCell>
                            <TableCell>금액</TableCell>
                            <TableCell>거래처코드</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>유효성체크</TableCell>
                            <TableCell>등록일</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    {/* {data.map((row, index) => (
                        <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.transaction}</td>
                        <td>{row.amount}</td>
                        <td>{row.description}</td>
                        <td>{row.status}</td>
                        <td>{row.etc}</td>
                        </tr>
                    ))} */}
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>23/09/30-1</TableCell>
                            <TableCell>입금</TableCell>
                            <TableCell>6930000</TableCell>
                            <TableCell>1566-5333</TableCell>
                            <TableCell>1566-5333</TableCell>
                            <TableCell>운송업</TableCell>
                            <TableCell>y</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            <div className="footer">
              {/* 푸터 부분 */}
            </div>
          </div>
        );
      }
      


}

export default customerTradeSlip;