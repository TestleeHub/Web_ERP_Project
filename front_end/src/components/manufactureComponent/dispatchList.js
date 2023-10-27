import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";

class dispatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            materialReleaseId: "",
            productionItemId: "",
            workOrderId: "",
            businessRelationId: "",
            registDate: "",
            details: []
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
            "/manufacture/dispatchList",
            {

            }).then((response) => {
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 10),
                    isLoading: false
                });
                console.log('response : ', response);
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

    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("dispatchData", JSON.stringify(data));
        this.props.history.push('/manufacture/dispatchAdd');
    }

    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/manufacture/dispatchListDelete",
            {
                materialReleaseId: targetdata.materialReleaseId,
                productionItemId: targetdata.productionItemId,
                workOrderId: targetdata.workOrderId,
                businessRelationId: targetdata.businessRelationId,
                details: targetdata.details,
                registDate: targetdata.registDate
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.materialReleaseId !== targetdata.materialReleaseId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.materialReleaseId !== targetdata.materialReleaseId)
                });
                console.log('response : ', response);
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

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // sorting 시작
    sortUsingMaterialReleaseId = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.materialReleaseId.localeCompare(b.materialReleaseId);
        });
        this.setState({
            displayedDatas: sortedData
        });

    }
    sortUsingProductionItemName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.productionItem.name.localeCompare(b.productionItem.name);
        });
        this.setState({
            displayedDatas: sortedData
        });

    }
    sortUsingBusinessRelationName = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.businessRelation.name.localeCompare(b.businessRelation.name);
        });
        this.setState({
            displayedDatas: sortedData
        });

    }
    sortUsingRegistDate = () => {
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.registDate - b.registDate;
        });
        this.setState({
            displayedDatas: sortedData
        });

    }
    // sorting 끝

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div style={{padding: '30px'}}>
                <div>
                    <Typography variant="h4" style={style}> 생산 불출 조회</Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                </div>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table style={tableStyle}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell style={tableCellStyle}> No.

                                </TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingMaterialReleaseId()}> 불출코드▽ </TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingProductionItemName()}> 생산 상품명▽ </TableCell>
                                <TableCell style={tableCellTitleStyle}> 작업지시서 </TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingBusinessRelationName()}> 거래처▽ </TableCell>
                                <TableCell style={tableCellTitleStyle}> 상세 내용 </TableCell>
                                <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingRegistDate()}> 등록일▽ </TableCell>
                                <TableCell style={tableCellTitleStyle}> 추가 작업 </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                <TableRow>
                                    <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.materialReleaseId} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.productionItem ? data.productionItem.name : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.workOrderId ? data.workOrder.name : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.businessRelationId ? data.businessRelation.name : 'N/A'} </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {data.details && data.details.length > 0 ? data.details[0].name + ' 외' : ''}  {data.details ? data.details.length : 0} 건 </TableCell>
                                    <TableCell style={tableCellTitleStyle}> {this.formatDate(data.registDate)} </TableCell>
                                    <TableCell style={tableCellTitleStyle}>
                                        <div style={{paddingBottom: '8px'}}>
                                            <Button variant="contained" style={updateButton} onClick={() => this.editData(data)}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    수정
                                                    <img className="penImage" 
                                                        alt="pen" 
                                                        src="../images/pen.png" 
                                                        style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                                    />
                                                </div>
                                            </Button>
                                        </div>
                                        <Button variant="contained" style={deleteButton} onClick={() => this.deleteData(data)}> 
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                삭제
                                                <img className="garbageImage" 
                                                    alt="garbage" 
                                                    src="../images/garbage.png" 
                                                    style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                                />
                                            </div>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {showMore && (
                    <Button variant="contained" style={normalButton} onClick={this.handleShowMoreClick}>더 보기</Button>
                )}
                <br />
                <br />
                <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/logistics/inventorySelect')}>재고 조회</Button>
                <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/logistics/materialSelect')}>원자재 조회</Button>
                <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/logistics/storageSelect')}>창고 조회</Button>
            </div>
        );
    }
}

export default dispatchList;

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '17%',
    fontSize: '20px',
    paddingLeft: '30px',
    textAlign: 'center'
}

// 테이블 셀 스타일
const tableCellStyle = {
    fontSize: '20px',
    border: 'none'
}

const style = {
    display: 'flex',
    justifyContent: 'left'
}

// 500px input 창
const longInputStyle = {
    width: '500px',
    height: '50px',
    padding: '5px 10px',
};

// 300px input 창
const shortInputStyle = {
    width: '300px',
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

const checkBoxStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

const divLineStyle = {
    borderBottom: '3px solid navy'
};

// 사다리꼴 버튼 속성
const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '160px',
    height: '50px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    fontSize: '18px'
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px'
}

// 수정 버튼 속성
const updateButton = {
    backgroundColor: '#FF8C0A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    width: '140px',
    height: '40px',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '18px'
};