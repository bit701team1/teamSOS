import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const RedirectUri = (props) => {
    //alert("RedirectUri 호출");
    const location = useLocation();
    const [tokenAlreadyFetched, setTokenAlreadyFetched] = useState(false);
    const navi = useNavigate();

    const getNaverToken = async () => {
        //alert("getNaverToken 호출")
        if (!location.hash) return;
        const accessToken = location.hash.split('=')[1].split('&')[0]; //token 출력

        //이미 토큰을 가져온 경우, 추가 동작을 하지 않음
        if (tokenAlreadyFetched) {
            //alert("중복 방지");
            return;
        }

        Axios.get(`http://localhost:3000/oauth/callback?accessToken=${accessToken}`, {
            withCredentials: true
        })
            .then((res)=> {
                //네이버 회원정보 받아옴
                console.log(res.data.response);

                setTokenAlreadyFetched(true);

                Axios.post("http://localhost:3000/oauth/naverlogin", res.data.response)
                    .then((res) => {
                            navi("/");
                    }) .catch(error => {
                    //alert(error);
                    alert("로그인에 실패했습니다.");
                    });
            })
    };

    useEffect(() => {
        getNaverToken();
    }, [tokenAlreadyFetched]);

    return <div>
        대충 로그인 중이라는 화면
    </div>;
};

export default RedirectUri;