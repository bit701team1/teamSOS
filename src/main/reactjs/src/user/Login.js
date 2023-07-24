import "./Login.css";
import React, {useEffect, useState} from "react";
import Axios from "axios";
// import BackIcon from "../ImageTest/back-arrow.svg";
// import NaverIcon from "../ImageTest/naver-icon.svg";
// import GoogleIcon from "../ImageTest/google-icon.svg";
// import KakaoIcon from "../ImageTest/kakao-icon.svg";
// import Email from "../ImageTest/email-icon.svg";
// import Pass from "../ImageTest/password-icon.svg";

const LoginPage = () => {

    const BackIcon = process.env.REACT_APP_BUCKET + "/icon/back-arrow.svg";
    const NaverIcon = process.env.REACT_APP_BUCKET + "/icon/naver-icon.svg"
    const GoogleIcon = process.env.REACT_APP_BUCKET + "/icon/google-icon.svg"
    const KakaoIcon = process.env.REACT_APP_BUCKET + "/icon/kakao-icon.svg"
    const Email = process.env.REACT_APP_BUCKET + "/icon/email-icon.svg"
    const Pass = process.env.REACT_APP_BUCKET + "/icon/password-icon.svg"

    const [data, setData] = useState({
        email:'',
        password: ""
    })

    //로그인
    const handleLoginClick = () => {
        //dto로 /user/login 으로 넘겨야함
        let url = "/user/login";

        Axios.post(url, data).then(res => {
            alert("로그인 성공")

        }).catch(error => {
            // 로그인 실패 처리
            alert("로그인 실패");
        });
    }

    const { naver } = window

    useEffect(() => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
            callbackUrl: "http://localhost:3000/oauth",
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: '50' },
        });
        naverLogin.init();
    }, []);


    return (

        <div className="LoginPage">
            <div className="LoginPageHeader">
                <a href='#'>
                    <img className="HeaderIcon" alt="뒤로가기 버튼" src={BackIcon}/>
                </a>
                <span className="HeaderTitle">로그인</span>
            </div>

            <div className="LoginPageBody">
                <form>
                    <div className="LoginPageInput">
                        <input type="text" required placeholder='이메일을 입력하세요'
                               value={data.email}
                               onChange={(e) => setData({
                                   ...data,
                                   email: e.target.value
                               })
                               }/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <img className="emailicon" src={Email} alt="email"/>
                        <label>이메일</label>
                    </div>

                    <div className="LoginPageInput">
                        <input type="password" required placeholder='비밀번호를 입력하세요'
                               value={data.password}
                               onChange={(e) => setData({
                                   ...data,
                                   password: e.target.value
                               })
                               }/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <img className="passicon" src={Pass} alt="pass"/>
                        <label>비밀번호</label>
                    </div>
                </form>

                <label className="LoginPageCheck">
                    <input type="checkbox" name="email" value="eamil"/>
                    &nbsp; 이메일 저장
                </label>

                <div className="LoginPageLink">
                    <span>
                        <a href="/passfind">이메일/비밀번호찾기</a>
                    </span>
                </div>
            </div>

            <div className="LoginButton" onClick={handleLoginClick}>
                <span className="LoginButtonText">로그인</span>
            </div>

            <div className="LoginPageSocial">
                <div className="LoginNaver" id='naverIdLogin'></div>
                {/*<div className="LoginNaver">*/}
                {/*    <img alt="네이버" src={NaverIcon}/>*/}
                {/*</div>*/}
                <div className="LoginGoogle">
                    <img alt="구글" src={GoogleIcon}/>
                </div>
                <div className="LoginKakao">
                    <img alt="카카오" src={KakaoIcon}/>
                </div>
            </div>

            <div className="LoginPageFooter">
                <span className="LoginPageFooterText1">아직 회원이 아니신가요?</span>
                <span className="LoginPageFooterText2">{` `}</span>
                <a href="/join">
                    <span className="LoginPageFooterText3">회원가입</span>
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
