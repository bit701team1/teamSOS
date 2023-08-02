import React, {useState} from 'react';
import '../../css/managepagecss/managepagemain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {BlockList, Monitor, UserList} from "../index";
import Axios from "axios";

function ManagePageMain(props) {
    const k_photo=process.env.REACT_APP_MANAGE;
    const navi=useNavigate();
    const [activeLink, setActiveLink] = useState('userlist');

    // 뒤로 가기버튼을 누르면 / 으로
    const handleBeforePage=()=>{
        navi("/");
    };

    // 로그아웃 버튼
    const handleDeleteAdminCookie = () => {
        Axios.delete("/api/delete-cookie")
            .then(res => {
                alert("로그아웃이 되었습니다.")
                navi("/login");
            })
    }

    return (
        <div className="k-containermain">

            <div className="k-ct-nav">
                <img className="k-back-icon" alt="" src={`${k_photo}k_back_icon.svg`} onClick={handleBeforePage}/>
                <div className="k-nav-title">관리자 페이지</div>
            </div>

            <div className="k-admin-info">
                <img className="k-admin-photo" alt={'관리자 이미지'} src={`${k_photo}k_img_admin.jpg`} />
                <div className="k-admin-name">{`관리자 `}</div>
                <div className="k-logout" onClick={handleDeleteAdminCookie}>
                    <img className="k_logout_text" alt={'logout'} src={`${k_photo}k_icon_logout.svg`}/>
                </div>
            </div>

            <div className="k-manage-bar">
                <NavLink to={'/manage/userlist'} onClick={() => setActiveLink('userlist')}>
                    <div className="k-manage-bar-textbox1">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_people.svg`}/>
                    </div>
                    <div className={activeLink === 'userlist' ? 'k-manage-bar-text1 active-link' : 'k-manage-bar-text1'}>일반유저</div>
                </NavLink>

                <NavLink to={'/manage/blocklist'} onClick={() => setActiveLink('blocklist')}>
                    <div className="k-manage-bar-textbox2">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_block.svg`}/>
                    </div>
                    <div className={activeLink === 'blocklist' ? 'k-manage-bar-text2 active-link' : 'k-manage-bar-text2'}>신고회원</div>
                </NavLink>

                <NavLink to={'/manage/monitor'} onClick={() => setActiveLink('monitor')}>
                    <div className="k-manage-bar-textbox3">
                        <img className="k_icons" alt={'logout'} src={`${k_photo}k_icon_auctionhammer.svg`}/>
                    </div>
                    <div className={activeLink === 'monitor' ? 'k-manage-bar-text3 active-link' : 'k-manage-bar-text3'}>경매관리</div>
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
                <Route path={'monitor/*'} element={<Monitor/>}/>
            </Routes>

        </div>
    );
};

export default ManagePageMain;
