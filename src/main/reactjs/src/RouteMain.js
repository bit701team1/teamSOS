import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from "./UserPage/UserInfo";
import Mainauction from "./AuctionPage/Mainauction";
import AuctionLive from "./AuctionPage/AuctionLive";
import errorimg from './image/ERR404.png';
import JoinForm from "./user/JoinForm";
import LoginForm from "./user/LoginForm";
import Menu from "./user/Menu";
import Unauthorized from "./user/Unauthorized";


function RouteMain(props) {
    return (
        <div>
            <Routes>
                {/*<Route path='/room/:roomId' element={<AuctionLive/>}/>*/}
                <Route path='/userinfo' element={<UserInfo/>}/>
                <Route path='/room/:roomId' element={<AuctionLive/>}/>
                <Route path='/' element={<Mainauction/>}/>
                <Route path='/' element={<Menu/>}/>
                <Route path='/join' element={<JoinForm/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/unauth' element={<Unauthorized/>}/>



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