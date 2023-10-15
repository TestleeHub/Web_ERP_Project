import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";


// 출고 조회(outboundSelect)
class outboundSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            outboundId: "", // receiptId
            outboundDate: "", // receiptDate
            storageId: "",
            productionItemId: "",
            amount: "",
            client: ""
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
            "/logistics/ ", // ???
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
        window.localStorage.setItem("outboundData", JSON.stringify(data));
        this.props.history.push('/logistics/inventoryAdjustment'); // ????
    }


    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/logistics/inventoryListDelete", // ????
            {
                outboundId: targetdata.outboundId,
                outboundDate: targetdata.outboundDate,
                storageId: targetdata.storageId,
                productionItemId: targetdata.productionItemId,
                amount: targetdata.amount,
                client: targetdata.client

            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.outboundId !== targetdata.outboundId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.outboundId !== targetdata.outboundId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
            })
    }


    render() {
        const { displayedDatas, showMore } = this.state;

        return(
            <div>
                <br/>
                    <Typography variant="h4" style={style}> 출고 조회 </Typography>
                <br/>
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                <Table style={{border: '1px solid lightgray', backgroundColor: 'ghostwhite'}}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell> 출고 코드 </TableCell>
                            <TableCell> 일자 </TableCell>
                            <TableCell> 창고 코드 </TableCell>
                            <TableCell> 제품 코드 </TableCell>
                            <TableCell> 수량 합계 </TableCell>
                            <TableCell> 거래처명 </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.displayedDatas.map((data, index) => (
                            <TableRow>
                                <TableCell> {data.outboundId} </TableCell>
                                <TableCell> {data.outboundDate} </TableCell>
                                <TableCell> {data.storageId} </TableCell>
                                <TableCell> {data.productionItemId} </TableCell>
                                <TableCell> {data.amount} </TableCell>
                                <TableCell> {data.client} </TableCell>

                                <TableCell> 
                                    <Button variant="contained" style={normalButton} onClick={() => this.editData(data)}>수정</Button>
                                    <Button variant="contained" style={normalButton} onClick={() => this.deleteData(data)}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
                {showMore && (
                    <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                )}
                <Button variant="contained" style={normalButton} onClick={this.addSample}>신규(F2)</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>선택삭제</Button>
                <Button variant="contained" style={normalButton} onClick={this.addSample}>이력조회</Button>
                <br/><br/>
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

export default outboundSelect;