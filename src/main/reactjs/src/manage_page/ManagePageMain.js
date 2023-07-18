import React from 'react';
import './ManagePageMain.css';
import {NavLink, Route, Routes} from "react-router-dom";
import k_alert from '../k_manage_image/k_alert.svg';
import k_back_icon from '../k_manage_image/k_back_icon.svg';
import k_people_icon from '../k_manage_image/k_people_icon.svg';
import k_home from '../k_manage_image/k_home.svg';
import k_search_icon from '../k_manage_image/k_search_icon.svg';
import monitor from './Monitor';
import {BlockList, Monitor, UserList} from "./index";

function ManagePageMain(props) {

    return (
        <div className="k-containermain">
            <div className="k-ct-header" />

            <div className="k-ct-nav">
                <img className="k-back-icon" alt="" src={k_back_icon} />
                <div className="k-nav-title">관리자 페이지</div>
                <img className="k-alert-icon" alt="" src={k_alert} />
            </div>

            <div className="k-admin-info">
                <div className="k-admin-photo" />
                <div className="k-admin-name">{`관리자 `}</div>
                <div className="k-logout">
                    <div className="k_logout_text">로그아웃</div>
                </div>
            </div>

            <div className="k-manage-bar">
                <NavLink to={'/manage/userlist'}>
                    <div className="k-manage-bar-textbox1">
                        <div className="k-manage-bar-text1">회원목록</div>
                    </div>
                </NavLink>

                <NavLink to={'/manage/blocklist'}>
                    <div className="k-manage-bar-textbox2">
                        <div className="k-manage-bar-text2">신고리스트</div>
                    </div>
                </NavLink>

                <NavLink to={'/manage/monitor'}>
                    <div className="k-manage-bar-textbox3">
                        <div className="k-manage-bar-text1">모니터링</div>
                    </div>
                </NavLink>
            </div>

            {/*<div className="k-searchbox">*/}
            {/*    <img className="k-people-icon" alt="" src={k_people_icon} />*/}
            {/*    <input type={'text'} className="k-search-bar" >*/}
            {/*    </input>*/}
            {/*    <img className="k-search-icon" alt="" src={k_search_icon} />*/}
            {/*</div>*/}

            <Routes>
                <Route path={'userlist'} element={
                    <div className="k-list-show">
                    <UserList/>
                    </div>
                }/>

                <Route path={'userlist/:currentPage'} element={
                    <div className="k-list-show">
                    <UserList/>
                    </div>
                }/>

                <Route path={'blocklist'} element={
                    <div className="k-list-show">
                    <BlockList/>
                    </div>
                }/>

                <Route path={'blocklist/:currentPage'} element={
                    <div className="k-list-show">
                        <BlockList/>
                    </div>
                }/>


                <Route path={'monitor'} element={<Monitor/>}/>
            </Routes>


            {/*<div className="k-list-show"/>*/}


            <img className="k-footer-icon" alt="" src={k_home} />
        </div>
    );
};

export default ManagePageMain;
