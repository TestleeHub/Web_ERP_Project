import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import { request } from "../../helpers/axios_helper";

// 구매 입력에서 거래처 목록 클릭시 팝업창 뜨게
class Popup extends Component {

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

    formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
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
        this.props.onPopupData(selectedData); // 선택한 데이터를 부모 컴포넌트로 전달
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
                    <TableCell>거래처명</TableCell>
                    <TableCell>담당자</TableCell>
                    <TableCell>납기일</TableCell>
                    <TableCell>진행 상태</TableCell>
                  </TableRow>
                </TableHead>
    
                <TableBody>
                  {this.state.datas.map((data, index) => (
                    <TableRow onClick={() => this.handleDataSelection(data)}>
                      <TableCell> {data.salesFormId} </TableCell>
                      <TableCell> {data.customer ? data.customer.name : 'N/A'} </TableCell>
                      <TableCell> {data.employee ? data.employee.name : 'N/A'} </TableCell>
                      <TableCell> {this.formatDate(data.dueDate) ? this.formatDate(data.dueDate) : 'N/A'} </TableCell>
                      <TableCell> {data.progress ? '진행 완료' : '진행 중'} </TableCell>
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