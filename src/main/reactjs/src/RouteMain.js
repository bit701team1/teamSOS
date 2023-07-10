import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import errorimg from './image/ERR404.png';
import GitTestHome from './com/GitTestHome';
import UserInfo from "./UserPage/UserInfo";
import Mainauction from "./AuctionPage/Mainauction";
import AuctionLive from "./AuctionPage/AuctionLive";

function RouteMain(props) {
    return (
        <div>
            <Routes>
                {/*<Route path='/room/:roomId' element={<AuctionLive/>}/>*/}
                <Route path='/userinfo' element={<UserInfo/>}/>
                <Route path='/room/:roomId' element={<AuctionLive/>}/>
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