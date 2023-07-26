import React from 'react';
import './ManagePageMain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {BlockList, Monitor, UserList} from "./index";
import adminimg from '../k_manage_image/s72.jpg';
import Axios from "axios";

function ManagePageMain(props) {
    const k_photo=process.env.REACT_APP_MANAGE;

    const navi=useNavigate();

    const handleBeforePage=()=>{
        navi("/");
    };

    const handleDeleteAdminCookie = () => {
        Axios.delete("/api/delete-cookie")
            .then(res => {
                alert("쿠키값이 제거 => 로그아웃!")
            })
    }



    return (
        <div className="k-containermain">

            <div className="k-ct-nav">
                <img className="k-back-icon" alt="" src={`${k_photo}k_back_icon.svg`} onClick={handleBeforePage}/>
                <div className="k-nav-title">관리자 페이지</div>
            </div>

            <div className="k-admin-info">
                <img className="k-admin-photo" alt={'관리자 이미지'} src={adminimg} />
                <div className="k-admin-name">{`관리자 `}</div>
                <div className="k-logout" onClick={handleDeleteAdminCookie} style={{cursor:'pointer'}}>
                    <img className="k_logout_text" alt={'logout'} src={`${k_photo}k_icon_logout.svg`}/>
                </div>
            </div>

            <div className="k-manage-bar">
                <NavLink to={'/manage/userlist'}>
                    <div className="k-manage-bar-textbox1">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_people.svg`}/>
                    </div>
                    <div className="k-manage-bar-text1">일반유저</div>
                </NavLink>

                <NavLink to={'/manage/blocklist'}>
                    <div className="k-manage-bar-textbox2">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_block.svg`}/>
                    </div>
                    <div className="k-manage-bar-text2">신고회원</div>
                </NavLink>

                <NavLink to={'/manage/monitor'}>
                    <div className="k-manage-bar-textbox3">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_monitor.svg`}/>
                    </div>
                    <div className="k-manage-bar-text3">모니터링</div>
                </NavLink>
            </div>

            <Routes>
                <Route path={'userlist'} element={
                    <UserList/>
                }/>

                <Route path={'userlist/:currentPage'} element={
                    <UserList/>
                }/>

                <Route path={'blocklist'} element={
                    <BlockList/>
                }/>

                <Route path={'blocklist/:currentPage'} element={
                    <BlockList/>
                }/>


                <Route path={'monitor'} element={<Monitor/>}/>
            </Routes>

        </div>
    );
};

export default ManagePageMain;
