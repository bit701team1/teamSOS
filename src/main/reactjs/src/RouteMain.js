import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from './userpage/UserInfo'
import Mainauction from "./auctionpage/Mainauction";
import AuctionLive from "./auctionpage/AuctionLive";


import './manage_page/ManagePageMain.css';

import errorimg from './image/ERR404.png';
import JoinForm from "./user/JoinForm";
import LoginForm from "./user/LoginForm";
import Menu from "./user/Menu";
import {ManagePageMain} from "./manage_page";

import LiveStream from "./auctionpage/LiveStream";

import ResultPage from "./auctionpage/ResultPage";
import ResultPage2 from "./auctionpage/ResultPage2";
import RedirectURI from "./user/naverlogin/RedirectURI";
import RegisterProduct from "./product/RegisterProduct";
import AuctionLive2 from './auctionpage/AuctionLive2';



function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path='/userinfo' element={<UserInfo/>}/>
                {/*<Route path='/room/:roomId' element={<AuctionLive/>}/>*/}
                <Route path='/auction' element={<Mainauction/>}/>

                <Route path='/' element={<Menu/>}/>

                <Route path='/manage/*' element={<ManagePageMain/>}/>

                <Route path='/result' element={<ResultPage/>}/>

                <Route path='/join' element={<JoinForm/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/oauth' element={<RedirectURI/>}/>
                <Route path='/room/:roomId' element={<AuctionLive2/>}/>
                <Route path='/manage/*' element={<ManagePageMain/>}/>
                <Route path='/result2' element={<ResultPage2/>}/>
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