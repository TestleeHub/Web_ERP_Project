// 고정자산목록, fixedAssetsList
import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button, responsiveFontSizes } from '@mui/material';
import { Typography } from "@material-ui/core";
import { request } from "../../helpers/axios_helper";

class fixedAssetsList extends Component{

    // 고정자산 목록 조회
    fixedAssetsList = () => {
        this.props.history.push("/account/fixedAssetsList");
    }

    constructor(props){
        super(props);
        this.state = {
            datas: [],
            displayedDatas: [],
            showMore: true,
            isLoading: true,
            assetNo: "",
            assetName: "",
            assetType: "",
            assetTitle: "",
            assetTotal: "",
            acquistionCost: "",
            departmentId: "", // 담당부서로
            registDate: "",
            depreciation: ""
        }
    }

    handleShowMoreClick = () => {
        const { datas, displayedDatas } = this.state;
        const currentLength = displayedDatas.length;
        const nextChunk = datas.slice(currentLength, currentLength + 9);
        const newDisplayedData = [...displayedDatas, ...nextChunk];
        if(newDisplayedData.length === datas.length){
            this.setState({ showMore: false });
        }
        this.setState({ displayedDatas: newDisplayedData });
    }

    // 라이프사이클 중, 콤포넌트 생성 후 사용자에게 노출되기 전까지의 전체 과정
    componentDidMount(){
        this.setState({ isLoading: true });
        this.reloadData(); 
    }

    // 데이터 요청하기
    reloadData = (e) => {
        request(
            "GET",
            "/account/fixedAssetsList",
            {

            }).then((response) =>{
                this.setState({
                    datas: response.data,
                    displayedDatas: response.data.slice(0, 5),
                    isLoading: false
                });
                console.log('response: ', response);
                
            }).catch((error) => {
                console.log('error : ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
    }

    // 데이터 수정하기
    editData = (data) => {
        window.localStorage.setItem("fixedAssetFormData", JSON.stringify(data));
        this.props.history.push('/account/fixedAssetForm');
    }

    // 데이터 삭제하기 >>> validation: 1 → 0
    deleteData = (targetdata) => {
        request(
            "PUT",
            "/account/fixedAssetDelete",
            {
                assetNo: targetdata.assetNo,
                departmentId: targetdata.departmentId,
                assetName: targetdata.assetName,
                assetType: targetdata.assetType,
                assetTitle: targetdata.assetTitle,
                assetTotal: targetdata.assetTotal,
                acquistionCost: targetdata.acquistionCost,
                registDate: targetdata.registDate,
                depreciation: targetdata.depreciation
            }).then((response) => {
                this.setState({
                    datas: this.state.datas.filter(data => data.assetNo !== targetdata.assetNo),
                    displayedDatas: this.state.displayedDatas.filter(data => data.assetNo !== targetdata.assetNo)
                });
                console.log('response: ', response);
            }).catch((error) => {
                console.log('error: ', error);
            })
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // 항목 별, 정렬하기
    // this.state.displayDatas.slice() 적용 >>> displayDatas 배열 복사 
    // slice(): 배열 복사 메소드, 원본 배열 수정 x
    sortUsingAssetNo = () => { // assetNo 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.assetNo.localeCompare(b.assetNo);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingDepartmentId = () => { // departmentId 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.departmentId.localeCompare(b.departmentId);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingAssetName = () => { // assetName 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.assetName.localeCompare(b.assetName);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    sortUsingAssetTitle = () => { // assetTitle 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.assetTitle.localeCompare(b.assetTitle);
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingAssetTotal = () => { // assetTotal 정렬 => 자료형 int 기준 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.assetTotal - b.assetTotal;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingAcquistionCost = () => { // acquistionCost 정렬 => 자료형 int 기준 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.acquistionCost - b.acquistionCost;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }
    sortUsingRegistDate = () => { // registDate 정렬
        const sortedData = this.state.displayedDatas.slice().sort((a, b) => {
            return a.registDate - b.registDate;
        })
        this.setState({
            displayedDatas: sortedData
        })
    }

    render(){
        const { displayedDatas, showMore } = this.state;
        return(
            <div style={{padding:'30px'}}>
                <div>
                    <Typography variant="h4" style={style}>고정자산 조회</Typography>
                </div>
                <div style={divLineStyle}>
                    <Button variant="contained" style={trapezoidButton} onClick={this.fixedAssetsList}>전체</Button>
                </div>
                <div>
                    {this.state.isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                        <Table style={tableStyle}>
                            <TableHead style={{backgroundColor: 'lightgray'}}>
                                <TableRow>
                                    <TableCell style={tableCellStyle}>
                                        
                                    </TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAssetNo()} align="center">고정자산 번호▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAssetTitle()} align="center">고정자산계정명▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAssetName()} align="center">고정자산명▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">고정자산유형</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAssetTotal()} align="center">수량▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingAcquistionCost()} align="center">취득원가▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingRegistDate()} align="center">취득일자▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} onClick={() => this.sortUsingDepartmentId()} align="center">담당 부서명▽</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">적요</TableCell>
                                    <TableCell style={tableCellTitleStyle} align="center">추가 작업</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.displayedDatas.map((data, index) => (
                                    <TableRow>
                                        <TableCell style={{ ...tableCellStyle, backgroundColor: 'lightgray' }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.assetNo}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.assetTitle}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.assetName}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.assetType ? data.assetType : 'N/A'}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.assetTotal}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.acquistionCost}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{this.formatDate(data.registDate)}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.departmentId}</TableCell>
                                        <TableCell style={tableCellTitleStyle}>{data.depreciation ? data.depreciation : 'N/A'}</TableCell>
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
                </div>
            </div>
        );
    }
}
// 테이블 스타일
const tableStyle = {
    border: '1px solid lightgray',
    backgroundColor: 'ghostwhite',  // 배경색 ghost white
}

// 테이블 셀 이름 스타일
const tableCellTitleStyle = {
    width: '9%',
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

export default fixedAssetsList;