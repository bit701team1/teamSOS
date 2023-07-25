import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from './userpage/UserInfo'
import Mainauction from "./auctionpage/Mainauction";
import AuctionLive from "./auctionpage/AuctionLive";


import './manage_page/ManagePageMain.css';

import errorimg from './image/ERR404.png';
import JoinForm from "./user/oldcomponent/JoinForm";
import LoginForm from "./user/oldcomponent/LoginForm";
import Menu from "./user/Menu";
import {ManagePageMain} from "./manage_page";

import LiveStream from "./auctionpage/LiveStream";

import ResultPage from "./auctionpage/ResultPage";
import ResultPage2 from "./auctionpage/ResultPage2";
import RedirectURI from "./user/naverlogin/RedirectURI";
import RegisterProduct from "./product/RegisterProduct";
import AuctionLive2 from './auctionpage/AuctionLive2';
import Login from "./user/Login";
import Join from "./user/Join";
import PassFind from "./user/PassFind";
import PassAuth from "./user/PassAuth";
import PassUpdate from "./user/PassUpdate";
import Intro from "./user/Intro";



function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Menu/>}/>

                <Route path='/userinfo' element={<UserInfo/>}/>
                {/*<Route path='/room/:roomId' element={<AuctionLive/>}/>*/}
                <Route path='/auction' element={<Mainauction/>}/>



                <Route path='/manage/*' element={<ManagePageMain/>}/>

                <Route path='/result' element={<ResultPage/>}/>

                <Route path='/oldjoin' element={<JoinForm/>}/>
                {/*<Route path='/login' element={<LoginForm/>}/>*/}

                <Route path='/room/:roomId' element={<AuctionLive2/>}/>
                <Route path='/manage/*' element={<ManagePageMain/>}/>
                <Route path='/result2' element={<ResultPage2/>}/>
                <Route path={'/livestream'}>
                    <Route path={'livestream'} element={<LiveStream/>}/>
                </Route>
                <Route path='/product/*' element={<RegisterProduct/>}/>

                <Route path='/login' element={<Login/>}/>
                <Route path='/join' element={<Join/>}/>
                <Route path='/passfind' element={<PassFind/>}/>
                <Route path='/passauth' element={<PassAuth/>}/>
                <Route path='/passupdate' element={<PassUpdate/>}/>
                <Route path='/intro' element={<Intro/>}/>

                <Route path='/oauth' element={<RedirectURI/>}/>


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