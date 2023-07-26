import React from 'react';
import './PassFind.css';
import {useNavigate} from "react-router-dom";
// import BackIcon from "../ImageTest/back-arrow.svg";
// import FindPhone from "../ImageTest/phone-icon.svg";
// import FindEmail from "../ImageTest/email-icon.svg";
// import NaverIcon from "../ImageTest/naver-icon.svg";
// import GoogleIcon from "../ImageTest/google-icon.svg";
// import KakaoIcon from "../ImageTest/kakao-icon.svg";

function FindPassPage(props) {

    const BackIcon = process.env.REACT_APP_BUCKET + "/icon/back-arrow.svg";
    const FindPhone = process.env.REACT_APP_BUCKET + "/icon/phone-icon.svg";
    const FindEmail = process.env.REACT_APP_BUCKET + "/icon/email-icon.svg";
    const NaverIcon = process.env.REACT_APP_BUCKET + "/icon/naver-icon.svg";
    const GoogleIcon = process.env.REACT_APP_BUCKET + "/icon/google-icon.svg";
    const KakaoIcon = process.env.REACT_APP_BUCKET + "/icon/kakao-icon.svg";

    const navi = useNavigate();

    //모바일 인증으로 이동
    const handleFindPassClick = ()=>{
        navi("/passauth")
    }

    return (
        <div className="FindPassPage">
            <div className="FindPassPageHeader">
                <a href='/login'>
                    <img className="FindPassIcon" alt="뒤로가기 버튼" src={BackIcon}/>
                </a>
                <span className="FindPasspTitle">비밀번호 찾기</span>
            </div>

            <div className="FindPassHeaderText">
                <p>
                    비밀번호를 재설정합니다.<br/>
                    본인확인에 필요한 방법을 선택해주세요.
                </p>
            </div>

            <div className="FindPassPhoneButton" onClick={handleFindPassClick}>
                <img className="FindPhone" src={FindPhone} alt="phone"/>
                <span className="FindPhoneButtonText">휴대폰으로 찾기</span>
            </div>
            <div className="FindPassEmailButton">
                <img className="FindEmail" src={FindEmail} alt="email"/>
                <span className="FindEmailButtonText">이메일로 찾기</span>
            </div>

            <div className="FindPageSocial">
                <div className="FindNaver">
                    <img alt="네이버" src={NaverIcon}/>
                </div>
                <div className="FindGoogle">
                    <img alt="구글" src={GoogleIcon}/>
                </div>
                <div className="FindKakao">
                    <img alt="카카오" src={KakaoIcon}/>
                </div>
            </div>

            <div className="FindPageFooter">
                <span className="FindPageFooterText1">이미 회원이신가요?</span>
                <span className="FindPageFooterText2">{` `}</span>
                <a href="#">
                    <span className="FindPageFooterText3">로그인</span>
                </a>
            </div>


        </div>
    );
}

export default FindPassPage;