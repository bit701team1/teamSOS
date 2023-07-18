import React, {useEffect} from 'react';

const NaverButton  = ()=>{
    const client_id = "6ZMOvG6WUSN5P7l2D65H";
    const redirectURI = encodeURI("http://localhost:3000/oauth");
    const state = "randomstate";
    const naver_auth_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;

    const NaverLogin = () =>{
        window.location.href = naver_auth_url;
    };

    return <button onClick={NaverLogin}>네이버 로그인</button>
}

export default NaverButton;