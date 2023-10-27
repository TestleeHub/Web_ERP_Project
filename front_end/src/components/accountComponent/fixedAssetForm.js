import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";
import Modal from "react-modal";

class fixedAssetForm extends Component {

    // 고정자산 입력
    fixedAssetForm = () => {
        this.props.history.push("/account/fixedAssetForm");
    }

    // 고정자산 목록 조회
    fixedAssetsList = () => {
        this.props.history.push("/account/fixedAssetsList");
    }

    constructor(props) {
        super(props);
        this.state = {
            assetNo: "",
            assetName: "",
            assetType: "",
            assetTitle: "",
            assetTotal: "",
            acquistionCost: "",
            departmentId: "", // 담당부서로
            registDate: "",
            depreciation: ""
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("fixedAssetFormData");
        console.log(data);
        if (data != null) {
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('fixedAssetFormData');
        }
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
        request(
            "POST",
            "/account/fixedAssetForm",
            {
                assetNo: this.state.assetNo,
                assetName: this.state.assetName,
                assetType: this.state.assetType,
                assetTitle: this.state.assetTitle,
                assetTotal: this.state.assetTotal,
                acquistionCost: this.state.acquistionCost,
                departmentId: this.state.departmentId,
                registDate: this.state.registDate,
                depreciation: this.state.depreciation,
            }).then((response) => {
                console.log('response : ', response);
                alert('저장되었습니다. 고정자산 목록으로 이동합니다.')
                this.props.history.push('/account/fixedAssetsList');
            }).catch((error) => {
                console.log('error : ', error);
                if (error.response.status === 403) {
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    onReset = () => {
        this.setState({
            assetNo: "",
            assetName: "",
            assetType: "",
            assetTitle: "",
            assetTotal: "",
            acquistionCost: "",
            departmentId: "", // 담당부서로
            registDate: "",
            depreciation: ""
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Typography variant="h4" style={style}>고정자산 등록</Typography>
                </div>
                <div>
                    <Button variant="contained" style={trapezoidButton} onClick={this.fixedAssetForm}>고정자산 등록</Button>
                </div>
                <div>
                    <Table style={{ marginBottom: 15, width: '80%', border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>고정자산 번호</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="assetNo"
                                        value={this.state.assetNo}
                                        onChange={this.onChangeHandler}
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>고정자산명</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="assetName"
                                        value={this.state.assetName}
                                        placeholder="고정자산명"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>담당 부서</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <select name="departmentId" onChange={this.onChangeHandler}>
                                        <option value="">부서선택</option>
                                        <option value="인사팀">인사팀</option>
                                        <option value="제조팀">제조팀</option>
                                        <option value="재무팀">재무팀</option>
                                        <option value="구매팀">구매팀</option>
                                        <option value="영업팀">영업팀</option>
                                        <option value="자재팀">자재팀</option>
                                    </select>
                                    {this.state.departmentId === '' ? '     부서를 선택해주세요' : ''}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>고정자산계정명</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="assetTitle"
                                        value={this.state.assetTitle}
                                        placeholder="고정자산계정명"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>고정자산유형</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="assetType"
                                        value={this.state.assetType}
                                        placeholder="고정자산유형"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>    
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>취득원가</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="acquistionCost"
                                        value={this.state.acquistionCost}
                                        placeholder="취득원가"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>수량</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="assetTotal"
                                        value={this.state.assetTotal}
                                        placeholder="수량"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>취득일자</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="date"
                                        name="registDate"
                                        value={this.state.registDate}
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ border: 'none', fontWeight: 'bold' }}>적요</TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <input
                                        type="text"
                                        name="depreciation"
                                        value={this.state.depreciation}
                                        placeholder="적요"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <div>
                        <Button variant="outline-success" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
                        <Button variant="outline-success" style={normalButton} onClick={this.onReset}>다시 작성</Button>
                    <Button variant="outline-success" style={normalButton} onClick={this.fixedAssetsList}>고정자산 목록</Button>
                    </div>
                </div>
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
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '40px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}


export default fixedAssetForm;