import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import Modal from 'react-modal';
import Popup from "../popUp/purchasePopup";
import D_Popup from "../popUp/purchaseDPopup";

class purchaseForm extends Component{

    // 발주 입력
    orderForm = () => {
        this.props.history.push("/purchase/orderForm");
    }

    // 발주 목록 조회
    orderList = () => {
        this.props.history.push("/purchase/orderList");
    }

    // 구매 목록 조회
    purchaseList = () => {
        this.props.history.push("/purchase/purchaseList");
    }

    // 구매 입력
    purchaseForm = () => {
        this.props.history.push("/purchase/purchaseForm");
    }

    constructor(props) {
        super(props);
        this.state = {
            purchaseId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isPopupOpen: false,
            isD_PopupOpen: false,
            detailIndex: -1
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("purchaseFormData");
        console.log(data);
        if(data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('purchaseFormData');
        }
    }

    // 팝업 열기
    openPopup = () => {
        this.setState({ isPopupOpen: true });
    }
    openD_Popup = (detailIndex) => {
        this.setState({isD_PopupOpen: true, detailIndex: detailIndex});
    }

    // 팝업 닫기
    closePopup = () => {
        this.setState({ isPopupOpen: false });
    }
    closeD_Popup = () => {
        this.setState({isD_PopupOpen: false});
    }

    // 팝업에서 선택한 데이터를 받아오는 콜백 함수
    handlePopupData = (data) => {
        this.setState({ customerId: data.customerId, isPopupOpen: false });
        this.setState({ employeeId: data.employeeId, isPopupOpen: false });
    }
    handleD_PopupDdata = (data) => {
        const detailData = [...this.state.details]; // details 배열 복사
        detailData[this.state.detailIndex].materialId = data.materialId;
        detailData[this.state.detailIndex].standard = data.standard;
        this.setState({details: detailData, isD_PopupOpen: false});
    }

    // 버튼 클릭시 구매 디테일 행 추가
    addNewField = () => {
        this.setState(prevState => ({
            details: [
                ...prevState.details,
                {
                    materialId: "",
                    standard: "",
                    quantity: 0,
                    price: 0
                }
            ]
        }));
    }

    removeField = (index) => {
        this.setState(prevState => ({
            details: prevState.details.filter((_, i) => i !== index)
        }));
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

        if (name.startsWith("details[")) {
            const parts = name.match(/details\[(\d+)\]\.(\w+)/);
            if (parts && parts.length === 3) {
                const index = parseInt(parts[1]);
                const field = parts[2];
                this.setState(prevState => ({
                    ...prevState,
                    details: prevState.details.map((detail, i) => {
                        if (i === index) {
                            return { ...detail, [field]: value };
                        }
                        return detail;
                    })
                }));
            }
        } else {
            this.updateField(name, value); // 다른 필드 업데이트
        }
    };    

    // 추가 요청
    onSubmitAdd = (e) => {
        e.preventDefault();
        if (!this.state.purchaseId || !this.state.customerId || !this.state.employeeId || !this.state.dueDate || this.state.details.length === 0) {
            alert('저장 실패');
            return;
        }
        request(
            "POST",
            "/purchase/purchaseForm",
            {
                purcahseId: this.state.purchaseId,
                customerId: this.state.customerId,
                employeeId: this.state.employeeId,
                dueDate: this.state.dueDate,
                details: this.state.details
            }).then((response) => {
                console.log('response : ', response);
                alert('저장되었습니다. 구매 목록으로 이동합니다.')
                this.props.history.push('/purchase/purchaseList');
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    onReset = () => {
        this.setState({
            purchaseId: "",
            customerId: "",
            employeeId: "",
            dueDate: "",
            details: [],
            isPopupOpen: false,
            isD_PopupOpen: false,
            detailIndex: -1
        });
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
                                width: '700px', 
                                height: '400px', 
                                top: '50%',
                                left: '55%',
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <Popup onPopupData={this.handlePopupData} />
                        <br/>
                        <button onClick={this.closePopup}>닫기</button>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isD_PopupOpen}
                        onRequestClose={this.closeD_Popup}
                        contentLabel="팝업"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '700px', 
                                height: '400px', 
                                top: '50%',
                                left: '55%',
                                transform: 'translate(-50%, -50%)'
                            },
                        }}
                    >
                        {/* 팝업 컴포넌트에 선택한 데이터를 전달 */}
                        <D_Popup onD_PopupData={this.handleD_PopupDdata} />
                        <br/>
                        <button onClick={this.closeD_Popup}>닫기</button>
                    </Modal>
                </div>
                    
                <div>
                    <Typography style={style}>구매 입력</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButtonF} onClick={this.purchaseForm}>구매 입력</Button>
                </div>
                <div>
                    <Table style={{marginLeft: 15, width: '80%', backgroundColor:'#F5F5F5'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>구매코드</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="purchaseId" 
                                        value={this.state.purchaseId} 
                                        onChange={this.onChangeHandler} 
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell>거래처</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="customerId" 
                                        value={this.state.customerId} 
                                        placeholder="거래처코드" 
                                        onChange={this.onChangeHandler} 
                                        onClick={this.openPopup} 
                                        readOnly
                                        required
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>납기일자</TableCell>
                                <TableCell>
                                    <input 
                                        type="date" 
                                        name="dueDate" 
                                        value={this.state.dueDate} 
                                        onChange={this.onChangeHandler} 
                                        required
                                    />
                                </TableCell>
                                <TableCell>담당자</TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        name="employeeId" 
                                        value={this.state.employeeId} 
                                        placeholder="담당자" 
                                        onChange={this.onChangeHandler} 
                                        onClick={this.openPopup} 
                                        readOnly
                                        required
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Button variant="outline-success" style={{marginLeft: 15, marginRight:5, backgroundColor: '#D3D3D3'}}>찾기</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}}>정렬</Button>
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.orderList}>발주</Button> 
                    <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.purchaseList}>리스트</Button>
                </div>
                <div>
                    <Table style={{margin: 15}}>
                        <TableHead style={{backgroundColor:'#F5F5F5'}}>
                            <TableRow>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">원재료코드</TableCell>
                                <TableCell align="center">규격</TableCell>
                                <TableCell align="center">수량</TableCell>
                                <TableCell align="center">단가</TableCell>
                                <TableCell align="center">행 삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.details.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input type="checkbox" /> {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].materialId`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            // onClick={() => this.openD_Popup(index)}
                                            value={detail.materialId}
                                            required
                                            // readOnly
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].standard`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            // onClick={() => this.openD_Popup(index)}
                                            value={detail.standard}
                                            required
                                            // readOnly
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].quantity`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.quantity}
                                            required
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input 
                                            type="text"
                                            name={`details[${index}].price`}
                                            size="10"
                                            onChange={this.onChangeHandler}
                                            value={detail.price}
                                            required
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={() => this.removeField(index)}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.onSubmitAdd}>저장</Button>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.addNewField}>행 추가</Button>
                        <Button variant="outline-success" style={{margin: 5, backgroundColor: '#D3D3D3'}} onClick={this.onReset}>다시 작성</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default purchaseForm;

const style = {
    display:'flex',
    justifyContent:'left',
    margin: 15
}

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: '#D3D3D3',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

const trapezoidButtonF = {
    backgroundColor: '#D3D3D3',
    marginLeft: 15,
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}