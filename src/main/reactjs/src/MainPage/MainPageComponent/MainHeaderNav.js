import React, {useState} from 'react';
import './MainHeaderNav.css';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

function MainHeaderNav(props) {

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
        <div className='MainHeaderNavBar'>
            <nav>
                <NavLink to={"/main"}>HOME</NavLink>
                <NavLink className="AuctionNavBtn" to={"/auctionlist"}><p>AUCTION</p></NavLink>
                <div onClick={userTypeCheck}>
                    <p>USER</p>
                </div>
                {/*로그인 상태창으로 활용*/}
                {/*<div id="indicator"></div>*/}
            </nav>
        </div>
    );
}

export default MainHeaderNav;
