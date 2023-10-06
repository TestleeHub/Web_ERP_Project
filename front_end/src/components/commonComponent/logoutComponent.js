import { Component } from "react";
import classNames from 'classnames';
import { request, setAuthToken } from "../../helpers/axios_helper";

class logoutComponent extends Component {

    componentDidMount(){
        this.onSubmitLogout();
    }

    // 로그아웃 처리
    onSubmitLogout = () => {
        request(
            "POST",
            "/logout"
            ).then((response) => {
                console.log('response : ', response);
                setAuthToken(null);
                alert("로그 아웃");
                this.props.history.push('/login');
                window.location.reload();
            }).catch((error) => {
                console.log('error : ', error);
                setAuthToken(null);
                alert("로그 아웃");
                this.props.history.push('/login');
                window.location.reload();
            })
        }

    render() {
        return (
            <></>
        );
    }
}

export default logoutComponent;