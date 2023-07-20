import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from "./userpage/UserInfo";
import Mainauction from "./auctionpage/Mainauction";
import AuctionLive from "./auctionpage/AuctionLive";

import React from 'react';
import './manage_page/ManagePageMain.css';

import errorimg from './image/ERR404.png';
import JoinForm from "./user/JoinForm";
import LoginForm from "./user/LoginForm";
import Menu from "./user/Menu";
import {ManagePageMain} from "./manage_page";

import LiveStream from "./auctionpage/LiveStream";

import ResultPage from "./auctionpage/ResultPage";
import RedirectURI from "./user/naverlogin/RedirectURI";
import RegisterProduct from "./product/RegisterProduct";



function RouteMain(props) {
    return (
        <div>
            <Routes>

                <Route path='/userinfo' element={<UserInfo/>}/>
                <Route path='/room/:roomId' element={<AuctionLive/>}/>
                <Route path='/' element={<Mainauction/>}/>

                <Route path='/menu' element={<Menu/>}/>

                <Route path='/manage/*' element={<ManagePageMain/>}/>

                <Route path='/result' element={<ResultPage/>}/>

                <Route path='/join' element={<JoinForm/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/oauth' element={<RedirectURI/>}/>

                <Route path='/manage/*' element={<ManagePageMain/>}/>
                <Route path={'/livestream'}>
                    <Route path={'livestream'} element={<LiveStream/>}/>
                </Route>
                <Route path='/product/*' element={<RegisterProduct/>}/>

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