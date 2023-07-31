import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "@mui/material";

function Menu(props) {
    const navigate = useNavigate();
    const [userType,setUserType]=useState('')

    const userTypeCheck= async()=> {
        const url = "/lobby/mypagecheck";
        await axios.get(url)
            .then(res => {
                setUserType(res.data);
                console.log("userType : " + res.data);
                if (res.data === 2) {
                    navigate('/manage/userlist');

                } else if (res.data === 1) {
                    console.log(userType);
                    navigate('/userinfo');
                }
            })
       .catch(error => {
            console.error('Error:', error);
        });
    }


    return (
        <div>
            <ul className=''>
                <li><NavLink to={"/login"}><h2>Login</h2></NavLink></li>
                <li><NavLink to={"/join"}><h2>Join</h2></NavLink></li>
                <li><NavLink to={"/manage/userlist"}><h2>manage</h2></NavLink></li>
                <li><NavLink to={"/userinfo"}><h2>마이페이지</h2></NavLink></li>
                <li><NavLink to={"/result2"}><h2>결과페이지수정</h2></NavLink></li>
                <li><NavLink to={"/intro"}><h2>Intro</h2></NavLink></li>
                <li onClick={userTypeCheck} style={{cursor:'pointer'}}>
                     <h2>마이페이지or 관리자페이지 아이콘</h2>
                </li>
                <li><NavLink to={"/auctionlist"}><h2>경매리스트</h2></NavLink></li>

            </ul>
        </div>
    );
}

export default Menu;