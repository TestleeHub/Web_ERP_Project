import { Component } from "react";
import '../../css/footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer_info">
                <div className="footer_link">
                    <ul>
                        <li><a href="#">회사소개</a></li>
                        <li><a href="#">이용약관</a></li>
                        <li><a href="#">개인정보</a></li>
                    </ul>
                </div>
                <div className="footer_info_customer">
                    <h4>고객센터 010-1111-2222</h4>
                    <p>평일 및 주말 09:30 ~ 18:30(공휴일 휴무)</p>
                </div>
                <div className="footer_info_company">
                    <span>법인명:ICTCorp </span> <span>대표:Lee YeanWoo </span> <span>사업자번호:123-1234
                    </span> <span>소재지:서울시 마포구</span>
                </div>
            </div>
        )
    }
}

export default Footer;