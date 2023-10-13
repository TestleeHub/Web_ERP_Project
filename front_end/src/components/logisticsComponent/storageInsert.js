import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";
// import testImage from '../../image/logistics/productInsert.png'

class storageInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageId: "",
            storageName: "",
            category: "",
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("storageData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('storageData');
        }
    }

    // // 팝업 열기
    // openPopup = () => {
    //     this.setState({ isPopupOpen: true });
    // }

    // // 팝업 닫기
    // closePopup = () => {
    //     this.setState({ isPopupOpen: false });
    // }

    // addNewField = () => {
    //     this.setState(prevState => ({
    //         details: [
    //             ...prevState.details,
    //             {
    //                 storageId: "",
    //                 storageName: "",
    //                 category: ""
    //             }
    //         ]
    //     }));
    // }

    // removeField = (index) => {
    //     this.setState(prevState => ({
    //         details: prevState.details.filter((_, i) => i !== index)
    //     }));
    // }

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
            "/logistics/storageListAdd",
            {
                storageId: this.state.storageId,
                storageName: this.state.storageName,
                category: this.state.category

            }).then((response) => {
                alert('등록되었습니다.');
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })

    }


    render() {
        return (

            <div>
                <br />
                <Typography variant="h4" style={style}> 창고등록 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>기본</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>창고정보</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>부가정보</Button>
                    {/* <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>품목 정보</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>수량</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>단가</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>원가</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>부가 정보</Button>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>관리 대상</Button> */}
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>창고코드</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    readOnly
                                    type="text"
                                    name="storageId"
                                    size="70"
                                    placeholder="창고 코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.storageId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>창고명</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    name="storageName"
                                    size="70"
                                    placeholder="창고명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.storageName}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>구분</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    onChange={this.onChangeHandler}
                                    value="창고"
                                    checked={this.state.category === "창고"}
                                /> 창고
                                <input
                                    type="checkbox"
                                    name="category"
                                    onChange={this.onChangeHandler}
                                    value="공장" 
                                    checked={this.state.category === "공장"}
                                    style={{ marginLeft: '10px' }}
                                /> 공장
                                <input
                                    type="checkbox"
                                    name="category"
                                    onChange={this.onChangeHandler}
                                    value="공장(외주비관리)"
                                    checked={this.state.category === "공장(외주비관리)"}
                                    style={{ marginLeft: '10px' }}
                                /> 공장(외주비관리)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>
                                <select style={{ width: '100px', height: '30px' }}>
                                    <option selected>거래처</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </TableCell>
                            <TableCell style={{ border: 'none' }}><input type="text" size="70" placeholder="거래처 검색" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>
                                <select style={{ width: '100px', height: '30px' }}>
                                    <option selected>제품</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </TableCell>
                            <TableCell style={{ border: 'none' }}><input type="text" size="70" placeholder="제품 검색" /></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                <Button variant="contained" style={normalButton} onClick={this.addNewField}>창고 추가</Button>
                
                <br /><br />
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

export default storageInsert;