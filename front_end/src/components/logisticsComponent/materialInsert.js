import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";
import Popup from "../popUp/productionPopup";
import Modal from 'react-modal';

// 원재료 등록(materialInsert)
class materialInsert extends Component{
    constructor(props) {
        super(props);
        this.state = {
            materialId: "",
            name: "",
            quantity: "",
            storageId: ""
        }
    }

    // getCurrentDate = () => {
    //     const today = new Date();
    //     const yyyy = today.getFullYear();
    //     const mm = String(today.getMonth() + 1).padStart(2, '0');
    //     const dd = String(today.getDate()).padStart(2, '0');
    //     return `${yyyy}-${mm}-${dd}`;
    // }
    
    // formatDate = (timestamp) => {
    //     const date = new Date(timestamp);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
    //     const day = date.getDate().toString().padStart(2, '0');

    //     return `${year}-${month}-${day}`;
    // }
    
    
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("materialData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('materialData');
        }
    }


    // 팝업 열기
    openPopup = () => {
        this.setState({ isPopupOpen: true });
    }


    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }


    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handlePopupData = (data) => {
        this.setState({ productionItemId: data.productionItemId, isPopupOpen: false });
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
            "/logistics/materialListAdd",
            {
                materialId: this.state.materialId,
                name: this.state.name,
                quantity: this.state.quantity,
                storageId: this.state.storageId

            }).then((response) => {
                alert('등록되었습니다.');
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    render(){
        return(
            <div>
                {/* 팝업 */}
                <div>
                    <Modal
                        isOpen={this.state.isPopupOpen}
                        onRequestClose={this.closePopup}
                        contentLabel="팝업"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '700px',  // 원하는 폭으로 설정
                                height: '400px', // 원하는 높이로 설정
                                top: '50%',      // 원하는 수직 위치로 설정
                                left: '55%',     // 원하는 수평 위치로 설정
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <Popup onPopupData={this.handlePopupData} />

                        <button onClick={this.closePopup}>닫기</button>
                    </Modal>
                </div>
                
                <br/>
                    <Typography variant="h4" style={style}> 원재료 등록 </Typography>
                <br/>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>원재료 등록</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 원재료 코드 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input
                                    readOnly
                                    type="text" 
                                    name="materialId" 
                                    className="redPlaceholder"
                                    style={longInputStyle}
                                    placeholder="원재료 코드는 자동으로 생성됩니다." 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.materialId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 원재료 이름 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    name="name" 
                                    style={longInputStyle}
                                    placeholder="원재료 이름" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 수량 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    style={shortInputStyle}
                                    placeholder="수량" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.quantity}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border: 'none'}}> 창고 코드 </TableCell>
                            <TableCell style={{border: 'none'}}>
                                <input
                                    readOnly
                                    type="text" 
                                    name="storageId" 
                                    style={longInputStyle}
                                    placeholder="창고 코드" 
                                    onChange={this.onChangeHandler} 
                                    value={this.state.storageId}
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
    width: '150px',
    height: '30px',
    padding: '10px 20px'
}

// 300px input 창
const shortInputStyle = {
    width: '300px',
    padding: '5px 10px',
};

// 700px input 창
const longInputStyle = {
    width: '700px',
    padding: '5px 10px',
};

export default materialInsert;