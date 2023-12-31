import React, { useEffect, useState } from 'react';
import '../css/userinfo.css';
import { styled } from '@mui/system';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function UserInfo(props) {

    const navi = useNavigate();
  const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#ffffff',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#D6B4A2',
    },
    '& .MuiSwitch-switchBase': {
      color: '#f4f3f4',
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: '#767577',
    },
  }));
  const photo = process.env.REACT_APP_SUICONURL;
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    axios.get('/room/userdata')
      .then(response => {
        setUserdata(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, []);

  // 알람 스위치 
  const handleToggle = () => {

    const updatedUserdata = {...userdata, isalarm: !userdata.isalarm };


    const url = '/room/alarm'; 
    axios.post(url, updatedUserdata)
      .then(response => {
        console.log('알람 값이 업데이트되었습니다.');
        console.log(updatedUserdata.isalarm + updatedUserdata.email);
        setUserdata(updatedUserdata); // userdata 업데이트
      })
      .catch(error => {
        console.log('알람 값을 업데이트하는데 실패하였습니다.', error);
      });
  }
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setUserdata(prevUserData => ({
      ...prevUserData,
      email: newEmail
    }));
  };

  const handleHpChange = (event) => {
    const newHp = event.target.value;
    setUserdata(prevUserData => ({
      ...prevUserData,
      hp: newHp
    }));
  };

  const handleUserNameChange = (event) => {
    const newUserName = event.target.value;
    setUserdata(prevUserData => ({
      ...prevUserData,
      user_name: newUserName
    }));
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setUserdata(prevUserData => ({
      ...prevUserData,
      password: newPassword
    }));
  };
  
  //정보 수정
  const updateInfo = () => {
    console.log(userdata);
    const { user_name, email, hp, user_id } = userdata;
    const updateData = {
      user_name,
      email,
      hp,
      user_id
    };
    const url = '/room/userupdate';
    axios.post(url, updateData)
      .then(response => {
        alert("수정이 완료되었습니다");
        console.log(updateData);
      })
      .catch(error => {
        alert("수정 실패");
        console.log(updateData);
      });
  };
  const updatepwd = () => {
    console.log(userdata);
    const { password, email } = userdata;
    const updateData = {
      password,
      email
    };
    const url = '/room/pwdupdate';
    axios.post(url, updateData)
      .then(response => {
        alert("비밀번호가 변경되었습니다");
        console.log(updateData);
      })
      .catch(error => {
        alert("수정 실패");
        console.log(updateData);
      });
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

    const handleBackClick = ()=>{
        navi("/main");
    }


  return (
    <div className="y_info-div">
      <img className="y_myimage" alt=""  src={`${photo}userimg.jpeg`} />
      <div className="y_input-field">
        <input className="y_info-input" value={userdata.email}
          onChange={handleEmailChange} />
      </div>
      <div className="y_input-field1">
        <input className="y_info-input" value={userdata.hp}
          onChange={handleHpChange}>
        </input>
      </div>
      <div className="y_input-field2">
        <div className="y_input-field3">
          <input className="y_info-input"
            type={showPassword ? 'text' : 'password'}
            style={{ width: '70%' }}
            onChange={handlePasswordChange} >
          </input>
        </div>
      </div>
      <button onClick={updatepwd}
        className='y_update-btn'>변경</button>
      <div className="y_infoemail-p">Email</div>
      <div className="y_input-field4">
        <input className="y_info-input" value={userdata.user_name}
          onChange={handleUserNameChange}>
        </input>
      </div>
      <div className="y_infoname-p">Name</div>
      <div className="y_pwd-p">Password</div>
      <div className="y_hp-p">Phone</div>
      <div className="y_editbox">
        <div className="y_edit-div" />
        <img className="y_icon-edit" alt="" src={`${photo}y_edit.svg`} />
      </div>

      <div className="y_info-p1">내 정보 관리</div>
      <button onClick={updateInfo} className="y_infoupdate-btn">
        수정완료
      </button>
      <div className="y_infobox" />
      <img className="y_icon-bell" alt="" src={`${photo}y_alarm.svg`} />
      <div className="y_info-p2">개인정보 변경</div>
      <div className="y_info-p3">회원님의 회원 정보를 변경하실 수 있습니다.</div>
      <div className="y_alarmupdate">
        <StyledSwitch checked={userdata.isalarm || false} onChange={handleToggle} />
      </div>
      <div className="y_infoalarm-p">알람 허용</div>
      <div className="y_inforeport-p">{`받은 신고 수 `}</div>
      <div className="y_infocenter-p">고객센터</div>
      <img
        className="y_centergo-icon"
        alt=""
        src={`${photo}y_centergo.svg`}
      />
      <div
        className="y_reportnum-p">
        {userdata.report_num}
      </div>
      <img className="y_icon-emoji-sad" alt="" src={`${photo}y_reporticon.svg`} />
      <img
        className="y_back" style={{ cursor: 'pointer' }}
        alt=""
        src={`${photo}y_back.svg`} onClick={handleBackClick}
      />
      <img
        className="y_center-icon"
        alt=""
        src={`${photo}y_center.svg`}
      />
      <div className="y_infoline" />
      <div className="y_infoboxline1" />
      <div className="y_infoboxline2" />
      <div className="y_infoboxline3" />
    </div>
  );
};
export default UserInfo;
