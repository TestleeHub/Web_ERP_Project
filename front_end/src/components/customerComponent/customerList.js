import React, { Component } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class customerList extends Component {
    state = {
        datas: [],
        displayedDatas: [],
        showMore: true,
        isLoading: true,
        customerId: "",
        name: "",
        ceoName: "",
        phone: "",
        faxNumber: "",
        type: "",
        bank: "",
        account: "",
        postMail: "",
        address: "",
    }

    handleShowMoreClick = () => {
        const { datas, displayedDatas } = this.state;
        const currentLength = displayedDatas.length;
        const nextChunk = datas.slice(currentLength, currentLength + 5);
        const newDisplayedData = [...displayedDatas, ...nextChunk];
        if (newDisplayedData.length === datas.length) {
            this.setState({ showMore: false }); // 더이상 데이터를 보여줄 필요가 없으면 "더 보기" 버튼을 숨깁니다.
        }
        this.setState({ displayedDatas: newDisplayedData });
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 까지의 전체 과정을 렌더링
    componentDidMount() {
        this.setState({ isLoading: true });
        this.reloadData();
    }

    // 데이터 요청
    reloadData = (e) => {
        request(
            "GET",
            "/customer/customerList",
            {

            }).then((response) => {
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 5),
                    isLoading: false
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("customerData", JSON.stringify(data));
        this.props.history.push('/customer/customerInsert');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/customer/customerDelete",
            {
                customerId: targetdata.customerId,
                name: targetdata.name,
                ceoName: targetdata.ceoName,
                phone: targetdata.phone,
                faxNumber: targetdata.faxNumber,
                type: targetdata.type,
                bank: targetdata.bank,
                account: targetdata.account,
                postMail: targetdata.postMail,
                address: targetdata.address
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.customerId !== targetdata.customerId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.customerId !== targetdata.customerId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div>
                <br />
                <Typography variant="h4" style={style}> 거래처 조회 </Typography>
                <br />
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell>거래처코드</TableCell>
                                <TableCell>거래처명</TableCell>
                                <TableCell>대표자명</TableCell>
                                <TableCell>전화번호</TableCell>
                                <TableCell>팩스번호</TableCell>
                                <TableCell>업종</TableCell>
                                <TableCell>은행코드</TableCell>
                                <TableCell>계좌번호</TableCell>
                                <TableCell>우편번호</TableCell>
                                <TableCell>상세주소</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell> {data.customerId} </TableCell>
                                    <TableCell> {data.name ? data.name : 'N/A'} </TableCell>
                                    <TableCell> {data.ceoName ? data.ceoName : 'N/A'} </TableCell>
                                    <TableCell> {data.phone ? data.phone : 'N/A'} </TableCell>
                                    <TableCell> {data.faxNumber ? data.faxNumber : 'N/A'} </TableCell>
                                    <TableCell> {data.type ? data.type : 'N/A'} </TableCell>
                                    <TableCell> {data.bank ? data.bank : 'N/A'} </TableCell>
                                    <TableCell> {data.account ? data.account : 'N/A'} </TableCell>
                                    <TableCell> {data.postMail ? data.postMail : 'N/A'} </TableCell>
                                    <TableCell> {data.address ? data.address : 'N/A'} </TableCell>
                                    <TableCell>
                                        <Button variant="contained" style={normalButton} onClick={() => this.editData(data)}>수정</Button>
                                        <Button variant="contained" style={normalButton} onClick={() => this.deleteData(data)}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                )}

                <br />
                {showMore && (
                    <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                )}
                <br />
                <br />
                <Button variant="contained" style={normalButton} onClick={() =>  this.props.history.push('/customer/customerInsert')}>신규</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>단계별 재고실사</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>재고조정</Button>
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
    width: '150px',
    height: '30px',
    padding: '10px 20px'
}

export default customerList;