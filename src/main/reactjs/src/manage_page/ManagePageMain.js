import React from 'react';
import './ManagePageMain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import k_alert from '../k_manage_image/k_alert.svg';
import k_back_icon from '../k_manage_image/k_back_icon.svg';
import {BlockList, Monitor, UserList} from "./index";
import sesoimg from '../k_manage_image/sesoimg.jpg';
import adminimg from '../k_manage_image/s72.jpg';
import Axios from "axios";

function ManagePageMain(props) {

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
            {/*<div className="k-ct-header" />*/}

            <div className="k-ct-nav">
                <img className="k-back-icon" alt="" src={k_back_icon} onClick={handleBeforePage}/>
                <div className="k-nav-title">관리자 페이지</div>
                <img className="k-alert-icon" alt="" src={k_alert} />
            </div>

            <div className="k-admin-info">
                <img className="k-admin-photo" alt={'관리자 이미지'} src={adminimg} />
                <div className="k-admin-name">{`관리자 `}</div>
                <div className="k-logout" onClick={handleDeleteAdminCookie} style={{cursor:'pointer'}}>
                    <div className="k_logout_text">로그아웃</div>
                </div>
            </div>

            <div className="k-manage-bar">
                <NavLink to={'/manage/userlist'}>
                    <div className="k-manage-bar-textbox1">
                        <div className="k-manage-bar-text1">일반유저</div>
                    </div>
                </NavLink>

                <NavLink to={'/manage/blocklist'}>
                    <div className="k-manage-bar-textbox2">
                        <div className="k-manage-bar-text1">신고회원</div>
                    </div>
                </NavLink>

                <NavLink to={'/manage/monitor'}>
                    <div className="k-manage-bar-textbox3">
                        <div className="k-manage-bar-text1">모니터링</div>
                    </div>
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
