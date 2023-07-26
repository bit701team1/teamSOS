import React from 'react';
import './ManagePageMain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {ProductList} from "./index";
import './UserList.css';
import './monitor.css';

function Monitor(props) {

    const k_photo=process.env.REACT_APP_MANAGE;

    const navi=useNavigate();

    return (
        <div className={'k_product_manage'}>
            <div className="k_product_container" >
                <div className={'k_product_navbar1'}>
                    <div className={'k_icon_sms_box'}>
                        <img className="k_icon_sms" alt="d" src={`${k_photo}k_icon_sms.svg`} />
                    </div>

                    <div className="k_product_nav_text1">알림 문자 발송</div>
                    <div className="k_product_nav_icon1">
                        <img
                            className="k_product_nav_icon1_right1"
                            alt="1"
                            src={`${k_photo}k_icon_right.svg`}
                        />
                    </div>
                </div>

                <div className={'k_product_navbar2'}>
                    <div className={'k_icon_check_box'}>
                        <img className="k_icon_check" alt="" src={`${k_photo}k_icon_check.svg`} />
                    </div>

                    <div className="k_product_nav_text2">경매 시작 승인</div>
                    <div className="k_product_nav_icon2">
                        <img
                            className="k_product_nav_icon2_right1"
                            alt="1"
                            src={`${k_photo}k_icon_right.svg`}
                        />
                    </div>
                </div>

                <div className={'k_product_navbar3'}>
                    <div className={'k_icon_productlist_box'}>
                        <img className="k_icon_productlist_move" alt="" src={`${k_photo}k_icon_productlist.svg`} />
                    </div>

                    <div className="k_product_nav_text3">낙찰 목록 관리</div>
                    <NavLink to={'/productlist'}>
                        <div className="k_product_nav_icon3">
                            <img
                                className="k_product_nav_icon3_right1"
                                alt="1"
                                src={`${k_photo}k_icon_right.svg`}
                            />
                        </div>
                    </NavLink>
                </div>

                <div className={'k_product_navbar4'}>
                    <div className={'k_icon_qna_box'}>
                        <img className="k_icon_qna_move" alt="" src={`${k_photo}k_icon_question.svg`} />
                    </div>

                    <div className="k_product_nav_text4">고객 센터</div>
                    <div className="k_product_nav_icon4">
                        <img
                            className="k_product_nav_icon4_right1"
                            alt="1"
                            src={`${k_photo}k_icon_right.svg`}
                        />
                    </div>
                </div>

                <Routes>
                    <Route path={'productlist'} element={
                        <ProductList/>
                    }/>
                </Routes>

            </div>
        </div>
    );
}

export default Monitor;