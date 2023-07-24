import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import Axios from "axios";


function LoginForm(props) {

    const [data, setData] = useState({
        email:'',
        password: ""
    })

    const handleDeleteClick = () => {
        Axios.delete("/api/delete-cookie")
            .then(res => {
                alert("쿠키값 제거")
            })
    }

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

    // const handleIsLoginClick = () => {
    //     let url = "/user/islogin";
    //     Axios.get(url).then(res => {
    //         alert("로그인 중입니다")
    //     }).catch(error => {
    //         // 로그인 실패 처리
    //         alert("회원정보가 없습니다");
    //     });
    // }

    //naver Login
    const { naver } = window

    useEffect(() => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
            callbackUrl: "http://localhost:3000/oauth",
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: '40' },
        });
        naverLogin.init();
    }, []);

    // 단체 알림 서비스
    const handleClickAlarm = ()=>{
        let url = "/sms/send-many";
        Axios.post(url).then(res => {
            alert("발송 되었습니다");
        }).catch(error => {
            // 로그인 실패 처리
            alert("발송 실패");
        });
    }

    return (
        <div>
            <NavLink to={"/"}><h2>Menu</h2></NavLink>
            <h1>LoginForm</h1>
            <h3 style={{cursor:"pointer"}} onClick={handleDeleteClick}>클릭시 쿠키값을 지웁니다(로그아웃)</h3>
            <br/><br/>
            <div>
                <input type="text" value={data.email} placeholder='email' onChange={(e) => setData({
                    ...data,
                    email: e.target.value
                })
                }/>
            </div>
            <div>
                <input type="password" value={data.password} placeholder='password' onChange={(e) => setData({
                    ...data,
                    password: e.target.value
                })
                }/>
                <button onClick={handleLoginClick}>로그인</button>
            </div>
            <br/>
            {/*<button onClick={handleIsLoginClick}>islogin</button>*/}
            <br/><br/>
            <div className="grid-naver" id='naverIdLogin'></div>
            <br/><br/>
            <button onClick={handleClickAlarm}>문자알림 발송</button>

            <br/><br/>

        </div>
    );
}

export default LoginForm;