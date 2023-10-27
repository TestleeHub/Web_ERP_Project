import React, { Component, Fragment } from "react";
import { Table, TableBody, TableRow, TableCell, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";

class SalaryStateSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            isLoading: true,
            displayedDatas: [],
            showMore: true
        }
    }

    componentDidMount(){
        
        request(
            "GET",
            "/humanResources/empList",
            {

            }).then((response) => {
                const data = response.data
                
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 5),
                    isLoading: false
                });
                console.log(data)
                
            }).catch((error) => {
                console.log('error: ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
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

    render(){
        const { datas, showMore } = this.state;
        return(
            <div>
                <div>
                    <Button style={trapezoidButton}>급여조회</Button>
                </div>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd} rowSpan={2}>성명</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={2}>부서명</TableCell>
                                <TableCell style={tableLineAdd}>기본급</TableCell>
                                <TableCell style={tableLineAdd}>야근수당</TableCell>
                                <TableCell style={tableLineAdd2}>주말근무수당</TableCell>
                                <TableCell style={tableLineAdd}>연차수당</TableCell>
                                <TableCell style={tableLineAdd2}>출산보육수당</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>지급총액</TableCell>
                                <TableCell style={tableLineAdd}>소득세</TableCell>
                                <TableCell style={tableLineAdd}>주민세</TableCell>
                                <TableCell style={tableLineAdd}>국민연금</TableCell>
                                <TableCell style={tableLineAdd}>건강보험</TableCell>
                                <TableCell style={tableLineAdd}>고용보험</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>공제총액</TableCell>
                                <TableCell style={tableLineAdd} rowSpan={3}>실지급액</TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd}>부양가족수당</TableCell>
                                <TableCell style={tableLineAdd}>식대</TableCell>
                                <TableCell style={tableLineAdd}>차량유지비</TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}>장기요양</TableCell>
                                <TableCell style={tableLineAdd}>연말정산</TableCell>
                                <TableCell style={tableLineAdd}>사우회비</TableCell>
                                <TableCell style={tableLineAdd}>공제항목 추가 가능</TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: 'lightgray'}}>
                                <TableCell style={tableLineAdd}>사원번호</TableCell>
                                <TableCell style={tableLineAdd}>직급</TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                                <TableCell style={tableLineAdd}></TableCell>
                            </TableRow>
                            {this.state.isLoading ? (
                                <p>로딩 중...</p>
                            ) : (
                                this.state.displayedDatas.map(data => 
                                    <Fragment>
                                        <TableRow>
                                            <TableCell style={tableLine}>{data.name}</TableCell>
                                            <TableCell style={tableLine}>{data.departmentId}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.salary).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.salar.overtimePay).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.salar.weekendPay).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.salar.vacationPay).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine} rowSpan={2}>{parseFloat(data.totalSalary).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.nationalPension).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.healthInsurance).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.employInsurance).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={tableLine}>{data.employeeId}</TableCell>
                                            <TableCell style={tableLine}>{data.position}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.dependentFamiliyPay).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.carPay).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}></TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.totaldeduction).toLocaleString()}</TableCell>
                                            <TableCell style={tableLine}>{parseFloat(data.totalSalaryReal).toLocaleString()}</TableCell>
                                            
                                        </TableRow>
                                    </Fragment>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
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

const trapezoidButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '30px',
    padding: '10px 20px'
}

const tableLine = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    padding: '0',
    fontWeight: 'bold',
    width: '7%',
    height: '10px'
}
const tableLine2 = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    padding: '0',
    fontWeight: 'bold',
    width: '8%',
    height: '12px'
}
const tableLineAlign = {
    textAlign: 'center'
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
const tableLineAdd = { ...tableLine, ...tableLineAlign}
const tableLineAdd2 = { ...tableLine2, ...tableLineAlign}



export default SalaryStateSelect;