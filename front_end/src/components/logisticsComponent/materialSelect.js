import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";


// 원재료 조회(materialSelect)
class materialSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            materialId: "",
            name: "",
            quantity: "",
            storageId: "",
            storage: ""
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
            "/logistics/materialList", // ???
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
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }


    // update
    editData = (data) => {
        //반드시 데이터를 한번 가져간 후 localStorage에서 삭제해 줘야 함
        window.localStorage.setItem("materialData", JSON.stringify(data));
        this.props.history.push('/logistics/materialInsert');
    }


    // delete // 실제 삭제가 아닌 validation만 0으로 변경
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/logistics/materialListDelete", // ????
            {
                materialId: targetdata.materialId,
                name: targetdata.name,
                quantity: targetdata.quantity,
                storageId: targetdata.storageId

            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.materialId !== targetdata.materialId),
                    displayedDatas: this.state.displayedDatas.filter(data => data.materialId !== targetdata.materialId)
                });
                console.log('response : ', response);
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }


    render() {
        const { displayedDatas, showMore } = this.state;

        return(
            <div>
                <div>
                    <Typography variant="h4" style={style}> 원재료 조회 </Typography>
                </div>
                <br/>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.addSample}>조회</Button>
                </div>
                {/* 로딩 상태에 대한 조건부 렌더링 */}
                {this.state.isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                <Table style={tableStyle}>
                    <TableHead style={{backgroundColor: 'lightgray'}}>
                        <TableRow>
                            <TableCell style={tableCellTitleStyle}> 원재료 코드 </TableCell>
                            <TableCell style={tableCellTitleStyle}> 원재료 이름 </TableCell>
                            <TableCell style={tableCellTitleStyle}> 수량 </TableCell>
                            <TableCell style={tableCellTitleStyle}> 창고 </TableCell>
                            <TableCell style={tableCellTitleStyle}> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.displayedDatas.map((data, index) => (
                            <TableRow>
                                <TableCell style={tableCellTitleStyle}> {data.materialId} </TableCell>
                                <TableCell style={tableCellTitleStyle}> {data.name} </TableCell>
                                <TableCell style={tableCellTitleStyle}> {data.quantity} </TableCell>
                                <TableCell style={tableCellTitleStyle}> {data.storage.storageName} </TableCell>

                                <TableCell style={tableCellStyle}>
                                    <Button variant="contained" style={updateButton} onClick={() => this.editData(data)}>수정
                                        <img className="penImage" 
                                             alt="pen" 
                                             src="../images/pen.png" 
                                             style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                        />
                                    </Button>
                                    <Button variant="contained" style={deleteButton} onClick={() => this.deleteData(data)}> 삭제
                                        <img className="garbageImage" 
                                             alt="garbage" 
                                             src="../images/garbage.png" 
                                             style={{marginLeft: '8px', width: '20px', height: '20px', filter: 'invert(1)'}} 
                                        />
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
                <br/><br/>
            </div>
        );
    }
}

// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
};

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '20%',
    fontSize: '20px',
    border: 'none',
    paddingLeft: '30px',
};

// 테이블 셀 스타일
const tableCellStyle = {
    border: 'none'
};

const style = {
    display: 'flex',
    justifyContent: 'left'
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
};

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '150px',
    height: '40px',
    padding: '10px 20px',
    fontSize: '18px'
};

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


// 수정 버튼 속성
const updateButton = {
    backgroundColor: '#FF8C0A',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
}

// 삭제 버튼 속성
const deleteButton = {
    backgroundColor: '#A52A2A',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '35px',
    padding: '10px 20px',
    borderRadius: '20px'
}

export default materialSelect;