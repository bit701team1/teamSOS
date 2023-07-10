import React, {useState} from 'react';
import '../css/userinfo.css';
import {Switch,Radio} from "@mui/material";
import kermit from '../image/kermit.gif';
import {pink} from "@mui/material/colors";

function UserInfo(props) {
    const [selectedValue, setSelectedValue] = React.useState('e');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });
    return (
        <div className="y_userinfo">
            <div className="y_userinfo-child" />
            <div className="y_aa-arte-container">
                <p className="y_aa">
                    <span>{`    `}</span>
                    <span className="y_span">{` `}</span>
                    <span className="y_aa1">{`A&A`}</span>
                </p>
                <p className="y_arte-arena"> ARTE : ARENA</p>
            </div>
            <div className="y_username">Kermit님</div>
            <div className="y_my-page">MY PAGE</div>
            <img alt='' src={kermit} className="y_img"/>
            <div className="y_switch">
                        <Switch defaultChecked color="default" className='y_alarm' />
            </div>
            <div className="y_user1">알림 설정</div>
            <div className="y_user2">{`낙찰 수  0 `}</div>
            <div className="y_box1">
                <div className="y_box2" />
                <div className="y_box3">{`인증서 발급`}</div>
            </div>
            <div className="y_user4">개인정보 변경</div>
            <div className="y_user5">회원님의 정보를 변경하실 수 있습니다</div>
            <div className="y_user6">이메일</div>
            <div className="y_user7">비밀번호</div>
            <div className="y_user8">성별</div>
            <div className="y_user9">이름</div>
            <div className="y_user10">생일</div>
            <div className="y_user11">주소</div>
            <div className="y_user12">휴대폰</div>
            <div className="y_user13">상세주소</div>
            <input className="y_email"/>
            <input className="y_passwd"/>
            <input className="y_nameinput"/>
            <input className="y_birth"/>
            <input className="y_addr1"/>
            <input className="y_pnum1"/>
            <input className="y_pnum2"/>
            <input className="y_pnum3"/>
            <input className="y_addr4"/>
            <input className="y_addr2"/>
            <input className="y_addr3"/>
            <div className="y_woman">
                <Radio
                    {...controlProps('a')}
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
            </div>
            <div className="y_man">
                <Radio
                    {...controlProps('b')}

                />
            </div>
            <div className="y_user14">남자</div>
            <div className="y_user15">여자</div>
            <div className="y_buttons">
                <button type="button" className="btn btn-outline-dark" id="y_pwdupdate">
                    <h3>비밀번호 변경</h3></button>
            </div>
            <div className="y_buttons-parent">
                <button type="button" className="btn btn-outline-dark" id="y_addrsearch">
                    <h1>검색</h1></button>
            </div>
            <div className="y_header" />
            <div className="y_line" />
            <div className="y_line2" />
            <div className="y_line3" />
            <div className="y_line4" />
            <div className="y_line5" />
            <div className="y_line6" />
            <div className="y_line7" />
            <div className="y_line8" />
            <div className="y_infoupdate_div">
                <button type="button" className="btn btn-outline-dark" id="y_infoupdate"><h1>수정</h1></button>
            </div>
        </div>

    );
};
export default UserInfo;
