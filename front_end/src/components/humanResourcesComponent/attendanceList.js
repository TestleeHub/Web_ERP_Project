import React, { Component, Fragment } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { request, setAuthToken, setUserId, setUserRole} from "../../helpers/axios_helper";

class attendanceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true
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

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.reloadData();
    }

    // 페이지 다시 호출할때
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            // 경로가 변경될 때 실행할 코드
            // 예: 데이터 로딩 또는 초기화 작업
            this.reloadData();
            this.setState({isLoading: true});
        }
    }

    // emplist 정보
    reloadData = (e) => {
        request(
            "GET",
            "/humanResources/attendanceList",
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 5),
                    isLoading: false
                });
                console.log('response: ', response);
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

    render() {
        const { displayedDatas, showMore } = this.state;

        return (
            <div>
                <br />
                <Typography variant="h4" style={style}> 출퇴근 기록부 </Typography>
                <br />
                <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>전체</Button>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    <Table border="1" style={{ border: '1px solid lightgray', backgroundColor: 'ghostwhite' }}>
                        <TableHead style={{ backgroundColor: 'lightgray' }}>
                            <TableRow>
                                <TableCell>사원번호</TableCell>
                                <TableCell>출근</TableCell>
                                <TableCell>퇴근</TableCell>
                                {/* <TableCell>근무시간</TableCell> */}
                                <TableCell>현재상태</TableCell>
                                
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.displayedDatas.map((data, index) => (
                                
                                
                                <Fragment>
                                    {/* <TableRow>
                                        <TableCell colSpan={4}  style={{ backgroundColor: 'yellow' }}> 날짜: {this.formatDate(data.gotoWorkDay)} </TableCell>
                                    </TableRow> */}
                                    
                                    <TableRow>
                                        <TableCell> {data.employeeId} </TableCell>
                                        <TableCell>
                                            {data.gotoWorkDay ? this.formatDate(data.gotoWorkDay) : 0} : 
                                            {data.gotoWorkDay ? new Date(data.gotoWorkDay).getHours().toString().padStart(2, '0') : 0} 시
                                            {data.gotoWorkDay ? new Date(data.gotoWorkDay).getMinutes().toString().padStart(2, '0') : 0} 분
                                            {data.gotoWorkDay ? new Date(data.gotoWorkDay).getSeconds().toString().padStart(2, '0') : 0} 초
                                        </TableCell>
                                        <TableCell>
                                            {data.leaveWorkDay ? this.formatDate(data.leaveWorkDay) : 0} : 
                                            {data.leaveWorkDay ? new Date(data.leaveWorkDay).getHours().toString().padStart(2, '0') : 0} 시
                                            {data.leaveWorkDay ? new Date(data.leaveWorkDay).getMinutes().toString().padStart(2, '0') : 0} 분
                                            {data.leaveWorkDay ? new Date(data.leaveWorkDay).getSeconds().toString().padStart(2, '0') : 0} 초
                                        </TableCell>
                                        <TableCell> 
                                            {data.leaveWorkDay ? "퇴근" : "출근중" }
                                        </TableCell>
                                        <TableCell>  </TableCell>
                                        
                                    </TableRow>
                                </Fragment>
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

export default attendanceList;

