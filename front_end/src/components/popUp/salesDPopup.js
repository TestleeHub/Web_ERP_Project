import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

class SD_Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            selectedData: null,
            isLoading: true
        }
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
        "/purchase/salesForm_List",
        {

        }).then((response) => {
            this.setState({
            datas: response.data,
            isLoading: false
            });
            console.log('response : ', response);
        }).catch((error) => {
            console.log('error : ', error);
        })
    }

    // 사용자가 데이터 항목을 선택할 때 호출되는 함수
    handleDataSelection = (selectedData) => {
        this.setState({ selectedData });
        this.props.onSD_PopupData(selectedData); // 선택한 데이터를 부모 컴포넌트로 전달
    }

    render() {
        return (
            <div>
                <h3>주문 목록</h3>
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ backgroundColor: '#F5F5F5' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>주문 번호</TableCell>
                                <TableCell>품목 코드</TableCell>
                                <TableCell>규격</TableCell>
                                <TableCell>수량</TableCell>
                                <TableCell>단가</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.datas.map((data, index) => (
                                <TableRow onClick={() => this.handleDataSelection(data)}>
                                    <TableCell>{data.salesFormId}</TableCell>
                                    <TableCell>{data.details[0].productionItemId}</TableCell>
                                    <TableCell>{data.details[0].standard}</TableCell>
                                    <TableCell>{data.details[0].quantity}</TableCell>
                                    <TableCell>{data.details[0].price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        )
    }

}
export default SD_Popup;