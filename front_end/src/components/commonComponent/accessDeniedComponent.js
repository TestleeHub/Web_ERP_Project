import React, { Component } from "react";
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import accessDeniedComponentStyle from '../../css/accessDeniedComponent.module.css';

class accessDeniedComponent extends Component {
    render() {
        return(
            <>
                <div className={accessDeniedComponentStyle.header}>
                    {/* <h1>Page Error</h1> */}
                </div>
                <div className={accessDeniedComponentStyle.body}>
                    <div className={accessDeniedComponentStyle.features}>
                        <div className={accessDeniedComponentStyle.row1}>
                            <img className={accessDeniedComponentStyle.LockImage} 
                                            alt="Lock" 
                                            src="../images/Lock.png" 
                            />
                            <div className={accessDeniedComponentStyle.text_col}>
                                <h2>
                                    접근 권한이 없습니다.
                                </h2>
                            </div>
                            
                            <div className={accessDeniedComponentStyle.mainPageMoveBox} onClick={() => this.props.history.push('/main')}>
                                <div className={accessDeniedComponentStyle.mainImage}>
                                    <img alt="Main" src="../images/Main.png"/>
                                </div>
                                <div className={accessDeniedComponentStyle.mainPageMove}>
                                    <h3>메인화면</h3>
                                    <p>메인화면으로 이동합니다</p>
                                </div>
                                {/* <div className={accessDeniedComponentStyle.loginPageMove}>
                                    <h3>로그인화면</h3>
                                    <p>로그인화면으로 이동합니다</p>
                                </div> */}
                            </div>
                            <div className={accessDeniedComponentStyle.loginPageMoveBox} onClick={() => this.props.history.push('/login')}>
                                <div className={accessDeniedComponentStyle.logInImage}>
                                    <img alt="LogIn" src="../images/LogIn.png"/>
                                </div>
                                <div className={accessDeniedComponentStyle.loginPageMove}>
                                    <h3>로그인화면</h3>
                                    <p>로그인화면으로 이동합니다</p>
                                </div>
                                {/* <div className={accessDeniedComponentStyle.loginPageMove}>
                                    <h3>로그인화면</h3>
                                    <p>로그인화면으로 이동합니다</p>
                                </div> */}
                            </div>       

                        {/* <div className={accessDeniedComponentStyle.buttonBox}>
                                <div className={accessDeniedComponentStyle.mainMenuBtn}>
                                    <Button style={mainMenuBtn}> 메인화면 </Button>
                                    <p>메인화면으로 이동합니다</p>
                                </div>
                                <div className={accessDeniedComponentStyle.loginPageBtn}>
                                    <Button style={loginPageBtn}> 로그인 페이지 </Button>
                                    <p>로그인 페이지로 이동합니다</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                        
                </div>
                <div className={accessDeniedComponentStyle.footer}>
                    <div>
                    </div>
                </div>
            </>
        );
    }
}

const mainMenuBtn = {
    backgroundColor: 'whitesmoke',
    color: 'black',
    marginRight: '30px',
    width: '160px',
    height: '50px',
    padding: '10px 20px',
    marginTop: '30px',
    fontWeight: 'bold'
}

const loginPageBtn = {
    backgroundColor: 'whitesmoke',
    color: 'black',
    width: '160px',
    height: '50px',
    padding: '10px 20px',
    marginTop: '30px',
    fontWeight: 'bold'
}
export default accessDeniedComponent;