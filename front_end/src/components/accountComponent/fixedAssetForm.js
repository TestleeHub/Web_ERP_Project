import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Typography, Button, TableHead } from "@mui/material";
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";
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
                if(error.response.status === 403){
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                    window.location.reload();
                }else if(error.response.status === 401){
                    alert('로그인이 필요합니다.')
                    setAuthToken(null);
                    setUserId(null);
                    setUserRole(null);
                    this.props.history.push('/login');
                    window.location.reload();
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
            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant="h4" style={style}>고정자산 등록</Typography>
                </div>
                <br />
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.fixedAssetForm}>고정자산 등록</Button>
                </div>
                <div>
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>고정자산 번호</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="assetNo"
                                        className="redPlaceholder"
                                        placeholder="고정자산 번호는 자동으로 생성됩니다."
                                        value={this.state.assetNo}
                                        onChange={this.onChangeHandler}
                                        readOnly
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell style={tableCellTitleStyle}>고정자산명</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="assetName"
                                        value={this.state.assetName}
                                        placeholder="고정자산명"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyleC}>담당 부서</TableCell> 
                                <TableCell style={tableCellStyle}>
                                    <select name="departmentId" onChange={this.onChangeHandler} style={InputStyle300px}>
                                        <option value="">부서선택</option>
                                        <option value="인사팀">인사팀</option>
                                        <option value="제조팀">제조팀</option>
                                        <option value="재무팀">재무팀</option>
                                        <option value="구매팀">구매팀</option>
                                        <option value="영업팀">영업팀</option>
                                        <option value="자재팀">자재팀</option>
                                    </select>
                                    <br />
                                    {this.state.departmentId === '' ? '     부서를 선택해주세요' : ''}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>고정자산계정명</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="assetTitle"
                                        value={this.state.assetTitle}
                                        placeholder="고정자산계정명"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>고정자산유형</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="assetType"
                                        value={this.state.assetType}
                                        placeholder="고정자산유형"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>    
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>취득원가</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="text"
                                        name="acquistionCost"
                                        value={this.state.acquistionCost}
                                        placeholder="취득원가"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>수량</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={quantityInputStyle}
                                        type="text"
                                        name="assetTotal"
                                        value={this.state.assetTotal}
                                        placeholder="수량"
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}>취득일자</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
                                        type="date"
                                        name="registDate"
                                        value={this.state.registDate}
                                        onChange={this.onChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={tableCellTitleStyle}>적요</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <input style={InputStyle300px}
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
};

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
};

// 테이블 셀 이름 스타일(테이블 1)
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    border: 'none',
    paddingLeft: '30px'
}

// 테이블 셀 이름 스타일(테이블2)
const tableCellTitleStyle2 = {
    width: '240px',
    height: '50px',
    fontSize: '20px',
    border: 'none',
};

// 테이블 셀 이름 스타일(담당부서)
const tableCellTitleStyleC = {
    width: '20%',
    fontSize: '20px',
    border: 'none',
    paddingLeft: '30px',
    center: {
        flex: 1,
        justifyContent: "center",
      }
}

// 테이블 셀 속성
const tableCellStyle = {
    border: 'none',
};

// 500px input창 속성
const InputStyle500px = {
    width: '500px',
    height: '50px',
    padding: '5px 10px',
};

// 300px input창 속성
const InputStyle300px = {
    width: '300px',
    height: '50px',
    padding: '5px 10px',
};

// width 200px input창 속성
const InputStyle200px = {
    width: '200px',
    height: '50px',
    padding: '5px 10px',
};

// 수량 입력창 속성(100px)
const quantityInputStyle = {
    width: '100px',
    height: '50px',
    padding: '5px 10px',
};

const labelStyle = {
    fontSize: '20px',
    display: 'flex',
    float: 'left',
    alignItems: 'center',
    paddingRight: '20px'
};

// 체크박스 속성
const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    // width: '160px',
    width: '170px',
    height: '50px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    fontSize: '18px'
};

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '170px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px',
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};

// 밑줄
const divLineStyle = {
    borderBottom: '3px solid navy'
};

// 테이블 간격 조정(테이블 2개 이상시)
const tableInterval = {
    paddingTop: '50px'
};



export default fixedAssetForm;