import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request } from "../../helpers/axios_helper";

class instructionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            workOrderId: "",
            customerId: "",
            managerId: "",
            name: "",
            standard: "",
            quantity : "",
            completion: "",
            storageId: "",
            validation: "",
            dueDate: "",
            productionItemId: "",
            registDate: ""
        }
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
            "/manufacture/instructionList",
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
        window.localStorage.setItem("workOrderData", JSON.stringify(data));
        this.props.history.push('/manufacture/instructionListUpdate');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/manufacture/instructionListDelete",
            {
                workOrderId: targetdata.workOrderId,
                customerId: targetdata.customerId,
                managerId: targetdata.managerId,
                name: targetdata.name,
                standard: targetdata.standard,
                quantity: targetdata.quantity,
                completion: targetdata.completion,
                storageId: targetdata.storageId,
                dueDate: targetdata.dueDate,
                productionItemId: targetdata.productionItemId,
                registDate: targetdata.registDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.workOrderId !== targetdata.workOrderId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.workOrderId !== targetdata.workOrderId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    editcompleteData = (targetdata) => {
        request(
            "PUT",
            "/manufacture/instructionListUpdate",
            {
                workOrderId: targetdata.workOrderId,
                customerId: targetdata.customerId,
                managerId: targetdata.managerId,
                name: targetdata.name,
                standard: targetdata.standard,
                quantity: targetdata.quantity,
                completion: "Y",
                storageId: targetdata.storageId,
                dueDate: targetdata.dueDate,
                productionItemId: targetdata.productionItemId,
                validation : targetdata.validation,
                registDate: targetdata.registDate
            }).then((response) => {
                
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div>
                <br />
                <Typography variant="h4" style={style}> 작업지시서 조회</Typography>
                <br />
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell> 지시서 코드 </TableCell>
                                <TableCell> 거래처 </TableCell>
                                <TableCell> 담당자 </TableCell>
                                <TableCell> 지시서명 </TableCell>
                                <TableCell> 수량 </TableCell>
                                <TableCell> 완료 여부 </TableCell>
                                <TableCell> 받는창고 </TableCell>
                                <TableCell> 납기일 </TableCell>
                                <TableCell> 생산품 </TableCell>
                                <TableCell> 등록일 </TableCell>
                                <TableCell>  </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell> {data.workOrderId} </TableCell>
                                    <TableCell> {data.customerId ? data.customerId : 'N/A'} </TableCell>
                                    <TableCell> {data.managerId ? data.managerId : 'N/A'} </TableCell>
                                    <TableCell> {data.name ? data.name : 'N/A'} </TableCell>
                                    <TableCell> {data.quantity ? data.quantity : 'N/A'} </TableCell>
                                    <TableCell> {data.completion === "N" ? '진행 중' : '완료'} </TableCell>
                                    <TableCell> {data.storageId ? data.storageId : 'N/A'} </TableCell>
                                    <TableCell> {data.dueDate ? this.formatDate(data.dueDate) : 'N/A'} </TableCell>
                                    <TableCell> {data.productionItemId ? data.productionItemId : 'N/A'} </TableCell>
                                    <TableCell> {data.registDate ? this.formatDate(data.registDate) : 'N/A'} </TableCell>
                                    <TableCell>
                                        {data.completion === "N" ?
                                            <Button variant="contained" style={normalButton} onClick={() => this.editcompleteData(data)}>완료처리</Button>
                                            :
                                            ''}
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

export default instructionList;