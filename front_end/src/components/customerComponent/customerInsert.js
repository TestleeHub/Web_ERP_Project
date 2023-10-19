import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Tab } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class customerInsert extends Component {
    state = {
        customerId: "",
        name: "",
        ceoName: "",
        phone: "",
        faxNumber: "",
        type: "",
        bank: "",
        account: "",
        postMail: '',
        address: ''
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        const data = window.localStorage.getItem("customerData");
        console.log(data);
        if (data !== null) {
            // JSON 문자열을 파싱하여 객체로 변환
            const parsedData = JSON.parse(data);
            this.setState(parsedData);
            window.localStorage.removeItem('customerData');
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
            "/customer/customerAdd",
            {
                customerId: this.state.customerId,
                name: this.state.name,
                ceoName: this.state.ceoName,
                phone: this.state.phone,
                faxNumber: this.state.faxNumber,
                type: this.state.type,
                bank: this.state.bank,
                account: this.state.account,
                postMail: this.state.postMail,
                address: this.state.address
            }).then((response) => {
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })

    }

    searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                this.setState({
                    postMail: data.zonecode,
                    address: data.address
                });
            }
        }).open();
    }

    render() {
        return (

            <div>
                <br />
                <Typography variant="h4" style={style}> 거래처 등록 </Typography>
                <br />
                <div>
                    <Button variant="contained" style={trapezoidButton}>기본</Button>
                </div>
                <Table style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}> 거래처코드 </TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="customerId"
                                    placeholder="거래처코드"
                                    onChange={this.onChangeHandler}
                                    value={this.state.customerId}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>거래처명(이름)</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="name"
                                    placeholder="거래처명(이름)"
                                    onChange={this.onChangeHandler}
                                    value={this.state.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>대표자명</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="ceoName"
                                    placeholder="대표자명"
                                    onChange={this.onChangeHandler}
                                    value={this.state.ceoName}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>전화번호</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="phone"
                                    placeholder="전화번호"
                                    onChange={this.onChangeHandler}
                                    value={this.state.phone}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>팩스번호</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="faxNumber"
                                    placeholder="팩스번호"
                                    onChange={this.onChangeHandler}
                                    value={this.state.faxNumber}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>업종</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="type"
                                    placeholder="업종"
                                    onChange={this.onChangeHandler}
                                    value={this.state.type}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>은행</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="bank"
                                    placeholder="은행"
                                    onChange={this.onChangeHandler}
                                    value={this.state.bank}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>계좌번호</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="account"
                                    placeholder="계좌번호"
                                    onChange={this.onChangeHandler}
                                    value={this.state.account}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>우편번호</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <Button onClick={this.searchAddress}>주소검색</Button>
                                <input
                                    type="text"
                                    size="60"
                                    name="postMail"
                                    placeholder="우편번호"
                                    onChange={this.onChangeHandler}
                                    value={this.state.postMail}
                                    readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>상세주소</TableCell>
                            <TableCell style={{ border: 'none' }}>
                                <input
                                    type="text"
                                    size="70"
                                    name="address"
                                    placeholder="상세주소"
                                    onChange={this.onChangeHandler}
                                    value={this.state.address}
                                    readOnly
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

export default customerInsert;