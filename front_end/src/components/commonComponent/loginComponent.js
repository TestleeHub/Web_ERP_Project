import { Component } from "react";
import classNames from 'classnames';
import { request, setAuthToken } from "../../helpers/axios_helper";

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
                setAuthToken(response.data.token)
                this.props.history.push('/manufacture');
                window.location.reload();
            }).catch((error) => {
                console.log('error : ', error);
                setAuthToken(null);
            })
    
        }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <br/><br/><br/>
                    <br/><br/><br/>
                    <h3>Wep ERP 로그인</h3>
                    <div className="tab-content">

                            {/* 로그인 폼 */}
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form outline mb-4">
                                    <label className="form-label" htmlFor="loginName">ID</label>
                                    <input type="text" id="loginName" name="id" className="form-control" onChange={this.onChangeHandler} />
                                </div>
                                <div className="form outline mb-4">
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler} />

                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign In</button>
                            </form>
                        

                    </div>
                </div>
            </div >
        );
    }
}

export default loginComponent;