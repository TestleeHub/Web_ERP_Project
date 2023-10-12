import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class productionAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productionItemId: "",
            process: "",
            name: "",
            standard: "",
            managerId: "",
            storageId: ""
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("productionData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('productionData');
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
            "/manufacture/productionListAdd",
            {
                productionItemId: this.state.productionItemId,
                process: this.state.process,
                name: this.state.name,
                standard: this.state.standard,
                managerId: this.state.managerId,
                storageId: this.state.storageId
            }).then((response) => {
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })

    }

    render() {
        return (

            <div>
                <br />
                <Typography variant="h4" style={style}> 품목등록 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 상품코드 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="productionItemId"
                                    placeholder="상품코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.productionItemId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>제품명</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="name"
                                    placeholder="제품명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>공정명</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="process"
                                    placeholder="공정명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.process}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>규격</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="standard"
                                    placeholder="규격"
                                    onChange={this.onChangeHandler}
                                    value={this.state.standard}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>담당자</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="managerId"
                                    placeholder="담당자"
                                    onChange={this.onChangeHandler}
                                    value={this.state.managerId}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>받는창고</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="storageId"
                                    placeholder="받는창고"
                                    onChange={this.onChangeHandler}
                                    value={this.state.storageId}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <br />
                <Button variant="contained" style={normalButton} onClick={this.onSubmitAdd}>저장</Button>
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

export default productionAdd;