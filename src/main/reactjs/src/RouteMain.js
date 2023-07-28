import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from './userpage/UserInfo'
import Mainauction from "./auctionpage/Mainauction";



import './css/ManagePageCSS/managePageMain.css';

import errorimg from './image/ERR404.png';
import JoinForm from "./user/oldcomponent/JoinForm";
import LoginForm from "./user/oldcomponent/LoginForm";
import Menu from "./user/Menu";
import {ManagePageMain, ProductList} from "./manage_page";
import LiveStream from "./auctionpage/LiveStream";
import ResultPage2 from "./auctionpage/ResultPage2";
import RedirectURI from "./user/naverlogin/RedirectURI";
import RegisterProduct from "./product/RegisterProduct";
// import AuctionLive2 from './auctionpage/AuctionLive2';
import Login from "./user/Login";
import Join from "./user/Join";
import PassFind from "./user/PassFind";
import PassAuth from "./user/PassAuth";
import PassUpdate from "./user/PassUpdate";
import Intro from "./user/Intro";
import RoomCreate from './auctionpage/RoomCreate';
import PaymentResult from "./auctionpage/PaymentResult";
import Enter from "./user/Enter";
import AuctionList from './auctionpage/AuctionList';
import OrderCompleteMobile from "./auctionpage/OrderCompleteMobile";
import AuctionLive2 from './auctionpage/AuctionLive_station';




function RouteMain(props) {
    const navigate = useNavigate();

    return (
        <div>
            <Routes>
                <Route path='/' element={<Menu/>}/>
                <Route path='/enter' element={<Enter/>}/>

                <Route path='/testlogin' element={<LoginForm/>}/>

                <Route path='/userinfo' element={<UserInfo/>}/>
                <Route path='/auction' element={<Mainauction/>}/>

                <Route path='/auctionlist' element={<AuctionList/>}/>

                <Route path='/roomcreate' element={<RoomCreate/>}/>
                <Route path='/manage/*' element={<ManagePageMain/>}/>
                <Route path='/productlist/*' element={<ProductList/>}/>

                <Route path='/oldjoin' element={<JoinForm/>}/>
                {/*<Route path='/login' element={<LoginForm/>}/>*/}

                <Route path='/room/:roomId' element={<AuctionLive2/>}/>
                <Route path='/result2' element={<ResultPage2/>}/>
                <Route path={'/livestream'}>
                    <Route path={'livestream'} element={<LiveStream/>}/>
                </Route>
                <Route path='/paymentresult' element={<PaymentResult/>}/>
                <Route path='/product/*' element={<RegisterProduct/>}/>

                <Route path='/passfind' element={<PassFind/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/ordercompletemobile' element={<OrderCompleteMobile />}/>
                <Route path='/join' element={<Join/>}/>
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