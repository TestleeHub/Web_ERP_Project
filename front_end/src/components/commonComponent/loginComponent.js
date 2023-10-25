import { Component } from "react";
import classNames from 'classnames';
import { request, setAuthToken, setUserId, setUserRole } from "../../helpers/axios_helper";
import loginPageStyle from '../../css/loginPage.module.css';

class loginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        }
    }

    // 필드의 업데이트 값을 state에 저장
    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name] : value
        });
    };

    // 로그인 처리
    onSubmitLogin = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                id:this.state.id,
                password:this.state.password
            }).then((response) => {
                console.log('response : ', response);
                setAuthToken(response.data.token);
                setUserId(response.data.employeeId);
                setUserRole(response.data.role);
                this.props.history.push('/main');
                window.location.reload();
            }).catch((error) => {
                console.log('error : ', error);
                setAuthToken(null);
                setUserId(null);
                setUserRole(null);
            })
    
        }

    render() {
        return (
            <>
                <div className={loginPageStyle.header}>
                    {/* <h1>Page Error</h1> */}
                </div>
                <div className={loginPageStyle.body}>
                    <div className={loginPageStyle.features}>
                        <div className={loginPageStyle.row1}>
                            <div className={loginPageStyle.box1}>
                                <div className={loginPageStyle.text_col}>
                                    <h3>
                                        Wep ERP 로그인
                                    </h3>
                                </div>
                                <div className={loginPageStyle.inputBox}>

                                    {/* 로그인 폼 */}
                                    <form onSubmit={this.onSubmitLogin}>
                                        <div className={loginPageStyle.loginId}>
                                            <label className="form-label" htmlFor="loginName"></label>
                                            <input type="text" id="loginName" name="id" className={loginPageStyle.inputId} placeholder="ID 또는 이메일 주소" onChange={this.onChangeHandler} />
                                        </div>
                                        <div className={loginPageStyle.loginPassword}>
                                            <label className="form-label" htmlFor="loginPassword"></label>
                                            <input type="password" id="-fologinPassword" name="password" className={loginPageStyle.inputPassword} placeholder="비밀번호" onChange={this.onChangeHandler} />
                                        </div>
                                        <div className={loginPageStyle.buttonBox}>
                                            <button type="submit" className={loginPageStyle.loginButton}>로그인</button>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className={loginPageStyle.smallText}> */}
                                    <p>Web ERP 회원이 아닌가요?<br/> 지금 가입하세요.</p>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default loginComponent;