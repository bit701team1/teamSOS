import React, {useState} from 'react';
import './PassAuth.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

// import BackIcon from "../ImageTest/back-arrow.svg";
// import Phone from "../ImageTest/phone-icon.svg";
// import Pass from "../ImageTest/password-icon.svg";
// import Confirm from "../ImageTest/confirm-button.svg"

function VerificationPage(props) {



    const BackIcon = process.env.REACT_APP_BUCKET + "/icon/back-arrow.svg";
    const Phone = process.env.REACT_APP_BUCKET + "/icon/phone-icon.svg";
    const Pass = process.env.REACT_APP_BUCKET + "/icon/password-icon.svg";
    const Confirm = process.env.REACT_APP_BUCKET + "/icon/confirm-button.svg";

    const navi = useNavigate()

    //인증번호
    const [authnum, setAuthnum] = useState("Never be Valid Words");
    const [inputauthnum, setInputAuthnum] = useState("");
    const [hp,setHp] = useState("");
    const [isAuth,setIsAuth] = useState("");

    //인증 번호 발송
    const handleConfirmClick = ()=>{
        if (hp == "") {
            alert("전화번호를 입력해주세요");
        } else {
            alert("인증번호가 발송되었습니다");
            Axios.post("/sms/send-one", {hp:hp}).then(res => {
                    //호출시 생성된 인증번호 저장
                    setAuthnum(res.data);
                }
            )
        }
    }

    const handleAuthClick = () => {
        //인증번호 유효성 검사
        if (authnum == inputauthnum) {
            //alert("authnum : " + authnum + " inputauthnum : " + inputauthnum);
            alert("인증되었습니다");

            navi(
                "/passupdate",{
                state: {
                    hp: hp
                }
                }
            )

           //navi("/passupdate")
        } else {
            //alert("authnum : " + authnum + " inputauthnum : " + inputauthnum)
            alert("인증번호가 틀렸습니다");
        }
    }


    return (
        <div className="VerificationPage">
            <div className="VerificationPageHeader">
                <a href='/passfind'>
                    <img className="VerificationIcon" alt="뒤로가기 버튼" src={BackIcon}/>
                </a>
                <span className="VerificationTitle">본인 인증</span>
            </div>

            <div className="VerificationHeaderText">
                <p>
                    휴대폰으로 본인 인증을 진행합니다.<br/>
                    전송 받은 코드를 2분 이내에 입력하세요.
                </p>
            </div>

            <form>
                <div className="VerificationInput">
                    <input type="text" required placeholder='휴대폰 번호를 입력하세요.'
                           value={hp} onChange={(e) => setHp( e.target.value
                        )
                    }/>
                    <span className="VerificationHighlight"></span>
                    <span className="VerificationBar"></span>
                    <img className="VerficationPhoneIcon" src={Phone} alt="Phone"/>
                    <label>휴대폰</label>
                </div>

                <div className="VerificationInput">
                    <input type="password" required placeholder='인증번호를 입력하세요.'
                           onChange={(e) => {
                               setInputAuthnum(e.target.value);
                           }}/>
                    <span className="VerificationHighlight"></span>
                    <span className="VerificationBar"></span>
                    <img className="VerificationPassIcon" src={Pass} alt="pass"/>
                    <label>인증번호</label>
                </div>

                <button className="ConfirmButton" onClick={handleConfirmClick}>
                    <img className="ConfirmIcon" alt='confirm-button' src={Confirm}/>
                </button>

                <div className="VerificationButton" onClick={handleAuthClick}>
                    <span className="VerificationButtonText">인증 확인</span>
                </div>
            </form>
        </div>
    );
}

export default VerificationPage;