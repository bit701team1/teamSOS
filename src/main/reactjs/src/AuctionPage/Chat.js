import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Mainauction from "./Mainauction";
import AuctionLive from "./AuctionLive";
function Chat(props) {
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetch('/test')
            .then(result => result.json())
            .then(result => setMsg(result));
        //fetch 해서 test 주소로 접속해서 (get방식, post 방식으로도 바꿀수있다), controller에서 return 받은 값을 json형식으로 변환해서
        //setMsg에 담겠다
    }, []); //[] 빈 값이면 최초 렌더링이 되었을떄 한번만 실행

    return (
            <Routes>
                <Route path='/' element={<Mainauction/>}></Route>
                <Route path='/room/:roomId' element={<AuctionLive/>}></Route>
                {/* :roomId는 room의 고유 서버 주소 -> room 뒤에 룸 Id가 오면 해당 룸 번호의 페이지로 이동함*/}
            </Routes>
    );
}

export default Chat;