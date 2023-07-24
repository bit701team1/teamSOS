import React, {useEffect, useState} from 'react';
import './PassUpdate.css';
import {useLocation} from "react-router-dom";
import Axios from "axios";
// import BackIcon from "../ImageTest/back-arrow.svg";
// import Pass from "../ImageTest/password-icon.svg";

function UpdatePassPage(props) {

    const BackIcon = process.env.REACT_APP_BUCKET + "/icon/back-arrow.svg";
    const Pass = process.env.REACT_APP_BUCKET + "/icon/password-icon.svg";

    const location = useLocation();
    const hp = location.state.hp;
    const [rawpassword,setRawPassWord] = useState("");
    const [checkpassword, setCheckPassWord] = useState("");

    const handleUpdateClick = ()=>{
        alert(hp);
        alert(rawpassword);

        if(rawpassword !== checkpassword){
            alert("비밀번호가 일치하지 않습니다");
        } else if (rawpassword!==""){
            Axios.post("/user/passUpatebyHp", {hp:hp,rawpassword:rawpassword})
                .then((response) => {
                    alert("성공적으로 변경되었습니다");
                })
                .catch((error) => {
                    // 에러가 발생했을 때의 처리
                    console.error("오류 발생:", error);
                    // 또는 오류 메시지를 사용자에게 보여주기 위해 alert로 처리
                    alert("오류가 발생했습니다. 다시 시도해주세요.");
                });

        }
    }

    return (
        <div className="UpdatePassPage">
            <div className="UpdatePassPageHeader">
                <a href='/passauth'>
                    <img className="UpdatePassIcon" alt="뒤로가기 버튼" src={BackIcon}/>
                </a>
                <span className="UpdatePassTitle">새로운 비밀번호 입력</span>
            </div>

            <div className="UpdatePassHeaderText">
                <p>
                    본인 인증이 완료되었습니다.<br/>
                    새로운 비밀번호를 입력하면 회원 정보가 업데이트 됩니다.
                </p>
            </div>

            <form>
                <div className="UpdatePassInput">
                    <input type="password" required placeholder='비밀번호를 입력하세요'
                           onChange={(e) => setRawPassWord(e.target.value)}
                    value={rawpassword}/>

                    <span className="UpdatePassHighlight"></span>
                    <span className="UpdatePassBar"></span>
                    <img className="UpdatePassicon" src={Pass} alt="pass"/>
                    <label>새로운 비밀번호 입력</label>
                </div>

                <div className="UpdatePassInput">
                    <input type="password" required placeholder='비밀번호를 재입력하세요'
                           onChange={(e) => setCheckPassWord(e.target.value)}
                           value = {checkpassword}/>
                    <span className="UpdatePassHighlight"></span>
                    <span className="UpdatePassBar"></span>
                    <img className="UpdatePassicon" src={Pass} alt="pass"/>
                    <label>비밀번호 확인</label>
                </div>
            </form>

            <div className="UpdatePassButton" onClick={handleUpdateClick}>
                <span className="UpdatePassButtonText">변경 완료</span>
            </div>
        </div>
    );
}

export default UpdatePassPage;