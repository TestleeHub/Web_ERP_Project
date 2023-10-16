import React, { Component } from 'react';
import { request } from "../../helpers/axios_helper";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';

class instructionPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      selectedData: null, // 선택한 데이터를 저장할 상태
      isLoading: true
    };
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
    this.props.onPopupData(selectedData); // 선택한 데이터를 부모 컴포넌트로 전달
  }

  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <div>
        <h3>작업 지시서 목록</h3>
        {this.state.isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <Table border="1" style={{ backgroundColor: 'light' }}>
            <TableHead>
              <TableRow>
                <TableCell> 지시서 코드 </TableCell>
                <TableCell> 지시서명 </TableCell>
                <TableCell> 생산품 </TableCell>
                <TableCell> 수량 </TableCell>
                <TableCell> 완료 여부 </TableCell>
                <TableCell> 납기일 </TableCell>
                <TableCell>  </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.datas.map((data, index) => (
                <TableRow onClick={() => this.handleDataSelection(data)}>
                  <TableCell> {data.workOrderId} </TableCell>
                  <TableCell> {data.name ? data.name : 'N/A'} </TableCell>
                  <TableCell> {data.productionItem ? data.productionItem.name : 'N/A'} </TableCell>
                  <TableCell> {data.quantity ? data.quantity : 'N/A'} </TableCell>
                  <TableCell> {data.completion === "N" ? '진행 중' : '완료'} </TableCell>
                  <TableCell> {data.dueDate ? this.formatDate(data.dueDate) : 'N/A'} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default instructionPopup;
