import React from 'react';
import '../css/live.css';
import test from '../image/R1.gif';
function UserInfo(props) {
    return (
        <div>
            <div className='y_logo'>A&A<br/><span style={{fontSize:'60px'}}>ARTE : ARENA</span></div>
            <div className='y_live'>
                <img alt='' src={test}></img>
            </div>
            <div className='y_title'>Live Station</div>
            <span style={{fontSize:'25px',color:'#590209',cursor:"pointer"}}>작품 상세보기 >></span>
            <div className='y_chat'></div>
            <input className='y_chatinput'></input>
            <button className='y_pay'>$</button>
        </div>
    );
}

export default UserInfo;
