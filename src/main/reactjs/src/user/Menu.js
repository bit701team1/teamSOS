import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Switch} from "@mui/material";

function Menu(props) {


    return (
        <div>
            <ul className=''>
                <li><NavLink to={"/login"}><h2>Login</h2></NavLink></li>
                <li><NavLink to={"/join"}><h2>Join</h2></NavLink></li>
                <li><NavLink to={"/manage"}><h2>manage</h2></NavLink></li>
                <li><NavLink to={"/myalert"}><h2>myalert</h2></NavLink></li>
            </ul>
        </div>
    );
}

export default Menu;