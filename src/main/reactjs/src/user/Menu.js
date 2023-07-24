import React from 'react';
import {NavLink} from "react-router-dom";

function Menu(props) {

    return (
        <div>
            <ul className=''>
                <li><NavLink to={"/login"}><h2>Login</h2></NavLink></li>
                <li><NavLink to={"/join"}><h2>Join</h2></NavLink></li>
                <li><NavLink to={"/manage"}><h2>manage</h2></NavLink></li>
                <li><NavLink to={"/userinfo"}><h2>마이페이지</h2></NavLink></li>
                <li><NavLink to={"/result"}><h2>결과페이지</h2></NavLink></li>
                <li><NavLink to={"/auction"}><h2>경매메인</h2></NavLink></li>
                <li><NavLink to={"/result"}><h2>결제</h2></NavLink></li>
                <li><NavLink to={"/result2"}><h2>결과페이지수정</h2></NavLink></li>
            </ul>
        </div>
    );
}

export default Menu;