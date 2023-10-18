import React, { Component } from "react";
import { Button } from '@mui/material';

class accessDeniedComponent extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <br /><br /><br />
                    <br /><br /><br />
                    <div className="tab-content">

                        {/* 로그인 폼 */}
                        <h1>접근 권한이 없습니다.</h1>

                        <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/login')}>로그인 페이지</Button>
                        <Button variant="contained" style={normalButton} onClick={() => this.props.history.push('/main')}>메인 화면</Button>
                    </div>
                </div>
            </div >
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

export default accessDeniedComponent;