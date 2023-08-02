import React, {useState} from 'react';
import '../../css/managepagecss/managepagemain.css';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {ProductList} from "../index";
import '../../css/managepagecss/userlist.css';
import '../../css/managepagecss/monitor.css';
import Axios from "axios";

function Monitor(props) {

    const k_photo=process.env.REACT_APP_MANAGE;
    const navi=useNavigate();

    // 경매 전 문자 알림 서비스 (isalarm이 1 전부)
    const handleClickAlarm = ()=>{
        let url = "/api/sms/send-many";
        Axios.post(url).then(res => {
            alert("발송 되었습니다");
        }).catch(error => {
            // 로그인 실패 처리
            alert("발송 실패");
        });
    }
    const [lst,setList]=useState([]);//방 목록
    const handleRoomCreate = () =>{
        let name=prompt('방제 입력').trim();
        if(!name) return alert('방 이름은 반드시 입력해야합니다');
        //방 생성 소스 들어갈 부분이다
        //서버와 fetch 통신함

        //방 만들기
        fetch('/lobby/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name})
        })
            .then(res=>res.json())
            .then(res=>{
                setList([
                    res,
                    ...lst
                ])
            })
            .catch(error=>{
                alert("방송이 끝났습니다");
            })
    }
    return (
        <div className={'k_product_manage'}>
            <div className="k_product_container" >
                <div className={'k_product_navbar1'}>
                    <div className={'k_icon_sms_box'}>
                        <img className="k_icon_sms" alt="d" src={`${k_photo}k_icon_sms.svg`} />
                    </div>

                    <div className="k_product_nav_text1">알림 문자 발송</div>
                    <div className="k_product_nav_icon1" onClick={handleClickAlarm}>
                        <img
                            className="k_product_nav_icon1_right1"
                            alt="1"
                            src={`${k_photo}k_icon_rightmove.svg`}
                        />
                    </div>
                </div>

                <div className={'k_product_navbar2'}>
                    <div className={'k_icon_check_box'}>
                        <img className="k_icon_check" alt="" src={`${k_photo}k_icon_check.svg`} />
                    </div>

                    <div className="k_product_nav_text2">경매 시작 승인</div>
                    <div className="k_product_nav_icon2" onClick={handleRoomCreate}>
                        <img
                            className="k_product_nav_icon2_right1"
                            alt="1"
                            src={`${k_photo}k_icon_rightmove.svg`}
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
                                src={`${k_photo}k_icon_rightmove.svg`}
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
                            src={`${k_photo}k_icon_rightmove.svg`}
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