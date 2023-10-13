import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";


// 입고 조회(inboundSelect)
class inboundSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            receiptId: "",
            receiptDate: "",
            storageId: "",
            productionItemId: "",
            amount: "",
            client: ""
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("receiptData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('receiptData');
        }
    }

    // 필드의 업데이트 값을 state에 저장
    updateField = (fieldName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.updateField(name, value); // 다른 필드 업데이트
    }

    // 추가 요청
    onSubmitAdd = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/logistics/receiptListAdd",
            {
                receiptId: this.state.receiptId,
                receiptDate: this.state.receiptDate,
                storageId: this.state.storageId,
                productionItemId: this.state.productionItemId,
                amount: this.state.amount,
                client: this.state.client

            }).then((response) => {
                alert('등록되었습니다.');
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    render(){
        return(

            <div>
                <br/>
                    <Typography variant="h4" style={style}> 입고 조회 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>출하입력</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>출고코드</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="receiptId" 
                                    size="70" 
                                    placeholder="출고코드" 
                                    onChange={this.onChangeHandler} 
                                    readOnly 
                                    value={this.state.receiptId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 일자 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="date" 
                                    name="receiptDate" 
                                    size="70" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.receiptDate}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>창고코드</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="storageId" 
                                    size="70" 
                                    placeholder="창고코드" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.storageId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>제품코드</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="productionItemId" 
                                    size="70" 
                                    placeholder="제품코드" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.productionItemId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>수량합계</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="amount" 
                                    size="70" 
                                    placeholder="수량합계" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.amount}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>거래처명</TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="client" 
                                    size="70" 
                                    placeholder="거래처명" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.client}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.addNewField}>항목 추가</Button>
                
                <br/><br/>

                {/* <Table style={{borderRight: '1px solid lightgray'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>  </TableCell>
                            <TableCell> 제품 코드 </TableCell>
                            <TableCell> 제품명 </TableCell>
                            <TableCell> 규격 </TableCell>
                            <TableCell> 수량 </TableCell>
                            <TableCell> 새로운 항목 추가 </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow style={{backgroundColor: 'ghostwhite'}}>
                            <TableCell style={{backgroundColor: 'lightgray'}}> 01 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 0011 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 스마트폰 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 23/10/04 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 40 </TableCell>
                            <TableCell>  </TableCell>
                        </TableRow>
                        <TableRow style={{backgroundColor: 'ghostwhite'}}>
                            <TableCell style={{backgroundColor: 'lightgray'}}> 02 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 0012 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 모니터 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 23/10/04 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 50 </TableCell>
                            <TableCell>  </TableCell>
                        </TableRow>
                        <TableRow style={{backgroundColor: 'ghostwhite'}}>
                            <TableCell style={{backgroundColor: 'lightgray'}}> 03 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 0013 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 노트북 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 23/10/04 </TableCell>
                            <TableCell style={{borderRight: '1px solid lightgray'}}> 60 </TableCell>
                            <TableCell>  </TableCell>
                        </TableRow> 
                    </TableBody>
                </Table>

                <br/>
                
                <Button variant="contained" style={normalButton} onClick={this.addSample}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>리스트</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>다시 작성</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>닫기</Button> */}
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
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '40px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
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

export default inboundSelect;