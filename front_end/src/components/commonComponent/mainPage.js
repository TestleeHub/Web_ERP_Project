import React, { Component } from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button} from '@mui/material';
import { request } from "../../helpers/axios_helper";

// 메인 페이지 테스트
class mainPage extends Component{
    state = {
        isRow1Visible: false,
        isRow2Visible: false,
        isRow3Visible: false,
        isRow4Visible: false,
        isRow5Visible: false,
        isRow6Visible: false
    }

    toggleVisibility = (row) => {
        this.setState(prevState => ({
            [row]: !prevState[row]
        }));
    }

    render() {
        return(
            <body>
                <div class="header">

                        <h3>Web_ERP Service</h3>
                        {/* <h1>영화, 드라마, TV 프로그램을 예약.</h1>
                        <h3>어디서든 예약하세요. 언제든 예약하실 수 있습니다.</h3>
                        <p>예약할 준비가 되셨나요? 로그인하려면 아이디와 비밀번호를 입력하세요.</p>
                        <form class="login_box">
                            <div class="login_box_left">
                                <input class="login_id" type="text" placeholder="아이디를 입력해주세요" required/>
                                <input class="login_password" type="password" placeholder="비밀번호를 입력해주세요" required/>
                            </div>
                            <div class="login_box_right">
                                <button type="submit"> 시작하기 </button>
                            </div>
                        </form> */}
                </div>
                <div className="features">
                    <div className="row1" onClick={() => this.toggleVisibility('isRow1Visible')}>
                        <div className="text_col">
                            <h2>
                                인적 관리
                                {this.state.isRow1Visible ? '▲' : '▼'}
                            </h2>
                            <p style={{
                                opacity: this.state.isRow1Visible ? '1' : '0', 
                                maxHeight: this.state.isRow1Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                사원 기본 정보 등록, 사원 목록, 급여 등록, <br/>
                                급여조회, 부서 목록 페이지 제작, 부서 추가 
                            </p> 
                        </div>
                        <div className="left_imoji">
                            <img className="HumanResourcesImage" 
                                        alt="HumanResources" 
                                        src="../images/HumanResources.png" 
                                        style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                            />
                        </div>
                    </div>

                    <div className="row2" onClick={() => this.toggleVisibility('isRow2Visible')}>
                        <div className="right_imoji">
                        <img className="ManufacturingImage" 
                                alt="Manufacturing" 
                                src="../images/Manufacturing.png" 
                                style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                        />
                        </div>
                        <div className="text_col">
                            <h2> 
                                제조 관리 
                                {this.state.isRow2Visible ? '▲' : '▼'} 
                            </h2>
                            <p style={{
                                opacity: this.state.isRow2Visible ? '1' : '0', 
                                maxHeight: this.state.isRow2Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                생산 품목 조회, 생산 품목 등록,  생산 불출 조회, 생산 불출 등록, <br/>
                                생산 입고 조회, 생산 입고 등록, 작업지시서 조회, 작업지시서 등록 </p> 
                        </div>
                    </div>

                    <div className="row3" onClick={() => this.toggleVisibility('isRow3Visible')}>
                        <div className="text_col">
                            <h2>
                                회계 관리
                                {this.state.isRow3Visible ? '▲' : '▼'}
                            </h2>
                            <p style={{
                                opacity: this.state.isRow3Visible ? '1' : '0', 
                                maxHeight: this.state.isRow3Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                매입장 조회, 매출장 조회, 일계표 조회, <br/>
                                월계표 조회, 고정자산 조회, 고정자산 등록 </p> 
                        </div>
                        <div className="left_imoji">
                            <img className="AccountingImage" 
                                    alt="Accounting" 
                                    src="../images/Accounting.png" 
                                    style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                            />
                        </div>
                    </div>

                    <div className="row4" onClick={() => this.toggleVisibility('isRow4Visible')}>
                        <div className="right_imoji">
                            <img className="PurchaseImage" 
                                    alt="Purchase" 
                                    src="../images/Purchase.png" 
                                    style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                            />
                        </div>
                        <div className="text_col">
                            <h2>
                                구매 / 판매 관리 
                                {this.state.isRow4Visible ? '▲' : '▼'} 
                            </h2>
                            <p style={{
                                opacity: this.state.isRow4Visible ? '1' : '0', 
                                maxHeight: this.state.isRow4Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                발주서 입력, 발주서 조회, 구매 입력, 구매 조회, <br/>
                                주문서 작성, 주문서 조회, 판매 입력, 판매 조회 </p> 
                        </div>
                    </div>

                    <div className="row5" onClick={() => this.toggleVisibility('isRow5Visible')}>
                        <div className="text_col">
                            <h2>
                                고객 관리
                                {this.state.isRow5Visible ? '▲' : '▼'} 
                            </h2>
                            <p style={{
                                opacity: this.state.isRow5Visible ? '1' : '0', 
                                maxHeight: this.state.isRow5Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                거래처 목록, 거래처 등록, 거래처 거래내역, <br/>
                                거래처 입금, 거래처 입금 처리, 거래처 입금 목록 </p> 
                        </div>
                        <div className="left_imoji">
                            <img className="ClientImage" 
                                    alt="Client" 
                                    src="../images/Client.png" 
                                    style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                            />
                        </div>
                    </div>

                    <div className="row6" onClick={() => this.toggleVisibility('isRow6Visible')}>
                        <div className="right_imoji">
                            <img className="LogisticsImage" 
                                alt="Logistics" 
                                src="../images/Logistics.png" 
                                style={{marginLeft: '8px', width: '300px', height: '300px'}} 
                            />
                        </div>
                        <div className="text_col">
                            <h2>
                                자제 관리
                                {this.state.isRow6Visible ? '▲' : '▼'}
                            </h2>
                            <p style={{
                                opacity: this.state.isRow6Visible ? '1' : '0', 
                                maxHeight: this.state.isRow6Visible ? '150px' : '0', 
                                transition: 'opacity 0.5s ease, max-height 0.7s ease',
                            }}>
                                메인 페이지 테스트, 재고 조정, 재고 조회, 원재료 등록, <br/>
                                원재료 조회, 창고 등록, 창고 조회 </p> 
                        </div>
                    </div>
                </div>
            </body>
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
    clipPath: 'polygon(20% 2%, 80% 2%, 100% 100%, 0% 100%)',
    width: '120px',
    height: '40px',
    padding: '10px 20px',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
}

// 기본 버튼 속성
const normalButton = {
    backgroundColor: 'navy',
    color: 'white',
    marginRight: '10px',
    width: '100px',
    height: '30px',
    padding: '10px 20px'
}

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

export default mainPage;