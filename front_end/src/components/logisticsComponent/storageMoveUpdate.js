import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';


// 봉인
// class storageMoveUpdate extends Component{
//     render(){
//         return(

//             <div>
//                 <br/>
//                     <Typography variant="h4" style={style}> 창고이동수정 </Typography>
//                 <br/>
//                 <div>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>창고이동</Button>
//                     {/* <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>품목 정보</Button>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>수량</Button>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>단가</Button>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>원가</Button>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>부가 정보</Button>
//                     <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>관리 대상</Button> */}
//                 </div> 
//                 <Table style={{borderCollapse: 'collapse', border: 'none', backgroundColor: 'lightgray'}}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell style={{border: 'none'}}> 일자 </TableCell>
//                                 <TableCell style={{border: 'none'}}>
//                                     <label>
//                                         <input type="date" 
//                                             id="date" 
//                                             max="2077-06-20" 
//                                             min="2077-06-05" 
//                                             value="2023-10-10"
//                                         />
//                                     </label>
//                                 </TableCell>
//                             <TableCell style={{border: 'none'}}>담당자</TableCell>
//                             <TableCell style={{border: 'none'}}><input type="text" size="50px" placeholder="담당자" /></TableCell>
                            
//                         </TableRow>
//                         <TableRow>
//                             <TableCell style={{border: 'none'}}>보내는 창고</TableCell>
//                             <TableCell style={{border: 'none'}}><input type="text" size="50px" placeholder="창고코드" /></TableCell>
//                             <TableCell style={{border: 'none'}}>받는 창고</TableCell>
//                             <TableCell style={{border: 'none'}}><input type="text" size="50px" placeholder="제품코드" /></TableCell>
//                         </TableRow>
//                     </TableHead>
//                 </Table>
                
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>찾기(F3)</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>정렬</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>주문</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>구매</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>생산</Button>
//                 <br/><br/>

//                 <Table style={{borderRight: '1px solid lightgray'}}>
//                     <TableHead style={{backgroundColor: 'lightgray'}}>
//                         <TableRow>
//                             <TableCell style={{border: 'none'}}>  </TableCell>
//                             <TableCell> 제품 코드 </TableCell>
//                             <TableCell> 제품명 </TableCell>
//                             <TableCell> 수량 </TableCell>
//                             <TableCell> 새로운 항목 추가 </TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         <TableRow style={{backgroundColor: 'ghostwhite'}}>
//                             <TableCell style={{backgroundColor: 'lightgray'}}> 01 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 0011 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 스마트폰 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 40 </TableCell>
//                             <TableCell>  </TableCell>
//                         </TableRow>
//                         <TableRow style={{backgroundColor: 'ghostwhite'}}>
//                             <TableCell style={{backgroundColor: 'lightgray'}}> 02 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 0012 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 모니터 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 50 </TableCell>
//                             <TableCell>  </TableCell>
//                         </TableRow>
//                         <TableRow style={{backgroundColor: 'ghostwhite'}}>
//                             <TableCell style={{backgroundColor: 'lightgray'}}> 03 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 0013 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 노트북 </TableCell>
//                             <TableCell style={{borderRight: '1px solid lightgray'}}> 60 </TableCell>
//                             <TableCell>  </TableCell>
//                         </TableRow> 
//                     </TableBody>
//                 </Table>
//                 <br/>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>저장(F8)</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>이전</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>다음</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>닫기</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>삭제</Button>
//                 <Button variant="contained" style={normalButton} onClick={this.addSample}>보내기</Button>
//                 <br/><br/>
//             </div>
            
//         );
//     }
// }

// const style = {
//     display: 'flex',
//     justifyContent: 'left'
// }

// // 사다리꼴 버튼 속성
// const trapezoidButton = {
//     backgroundColor: 'navy',
//     color: 'white',
//     marginRight: '10px',
//     clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
//     width: '120px',
//     height: '30px',
//     padding: '10px 20px'
// }

// // 기본 버튼 속성
// const normalButton = {
//     backgroundColor: 'navy',
//     color: 'white',
//     marginRight: '10px',
//     width: '120px',
//     height: '30px',
//     padding: '10px 20px'
// }

// export default storageMoveUpdate;