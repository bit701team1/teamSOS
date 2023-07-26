import React from 'react';
import './ManagePageMain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {ProductList} from "./index";
import './UserList.css';

function Monitor(props) {

    const navi=useNavigate();

    return (
        <div className={'k_product_manage'}>
            <div className={'k-moniter-send-list'} >
                <button type={"button"} className={"btn k-send-button"}>
                    경매 알림 문자 발송
                </button>
            </div>
            <div className={'k-moniter-room-list'} >
                <button type={"button"} className={"btn k-room-button"}>
                    경매 입장 방만들기
                </button>
            </div>
            <div className={'k-moniter-product-list'} >
                <NavLink to={'/productlist'}>
                    <button type={"button"} className={"btn k-product-button"}>
                        낙찰 목록 관리하기
                    </button>
                </NavLink>
            </div>
            \            {/*    #ffffff #2b2b2b #d6b4a2 #b24c4b #231717*/}
            <Routes>
                <Route path={'productlist'} element={
                    <ProductList/>
                }/>

            </Routes>
        </div>
    );
}

export default Monitor;