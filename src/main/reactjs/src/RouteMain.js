import React from 'react';
import { Route, Routes } from 'react-router-dom';
import errorimg from './image/ERR404.png';
import JoinForm from "./user/JoinForm";
import LoginForm from "./user/LoginForm";
import Menu from "./user/Menu";
import Unauthorized from "./user/Unauthorized";


function RouteMain(props) {
    return (
        <div>
            <Routes>
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