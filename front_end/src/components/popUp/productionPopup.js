import React, { Component } from 'react';
import { request } from "../../helpers/axios_helper";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';

class Popup extends Component {
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
      "/manufacture/productionList",
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

  render() {
    return (
      <div>
        <h3>생산 품목 목록</h3>
        {this.state.isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <Table border="1" style={{ backgroundColor: 'light' }}>
            <TableHead>
              <TableRow>
                <TableCell> 상품 코드 </TableCell>
                <TableCell> 공정 </TableCell>
                <TableCell> 생산 상품명 </TableCell>
                <TableCell> 규격 </TableCell>
                <TableCell> 생산 공장 코드 </TableCell>
                <TableCell> 받는 창고 코드 </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.datas.map((data, index) => (
                <TableRow onClick={() => this.handleDataSelection(data)}>
                  <TableCell> {data.productionItemId} </TableCell>
                  <TableCell> {data.process ? data.process : 'N/A'} </TableCell>
                  <TableCell> {data.name ? data.name : 'N/A'} </TableCell>
                  <TableCell> {data.standard ? data.standard : 'N/A'} </TableCell>
                  <TableCell> {data.factoryId ? data.factoryId : 'N/A'} </TableCell>
                  <TableCell> {data.storageId ? data.storageId : 'N/A'} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default Popup;
