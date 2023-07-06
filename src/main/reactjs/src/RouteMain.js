import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import errorimg from './image/ERR404.png';
import GitTestHome from './com/GitTestHome';
import AuctionLive from "./AuctionPage/AuctionLive";
import UserInfo from "./UserPage/UserInfo";
import Mainauction from "./AuctionPage/Mainauction";
import Chat from "./AuctionPage/Chat";

function RouteMain(props) {
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetch('/test')
            .then(result => result.json())
            .then(result => setMsg(result));
        //fetch 해서 test 주소로 접속해서 (get방식, post 방식으로도 바꿀수있다), controller에서 return 받은 값을 json형식으로 변환해서
        //setMsg에 담겠다
    }, []); //[] 빈 값이면 최초 렌더링이 되었을떄 한번만 실행
    return (
        <div>
            <Routes>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/room/:roomId' element={<AuctionLive/>}/>
                <Route path='/userinfo' element={<UserInfo/>}/>
                <Route path='/' element={<Mainauction/>}/>
                <Route path='/*' element={
                    <div>
                        <h1>잘못된 URL 주소입니다</h1>
                        <br/><br/>
                        <img alt='' src={errorimg}/>
                    </div>
                }/>

            </Routes>
        </div>
    );
}

export default RouteMain;