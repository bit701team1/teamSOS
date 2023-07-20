import React, {useEffect, useState} from 'react';
import '../css/userinfo.css';
import {styled} from '@mui/system';
import Switch from '@mui/material/Switch';
import kermit from '../image/kermit.gif';
import edit from '../image/y_edit.svg';
import back from '../image/y_back.svg';
import eyeopen from '../image/y_eye-open.svg';
import alarm from '../image/y_alarm.svg';
import report from '../image/y_reporticon.svg';
import center from  '../image/y_center.svg';
import centergo from '../image/y_centergo.svg';
import axios from 'axios';
function UserInfo(props) {
  const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#f5dd4b',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#81b0ff',
    },
    '& .MuiSwitch-switchBase': {
        color: '#f4f3f4',
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
        backgroundColor: '#767577',
    },
}));

  const [userdata, setUserdata] = useState({
    email:'',
    hp:'',
    user_name:''
  });
  useEffect(() => {
    axios.get('/room/userdata')
        .then(response => {
            setUserdata(response.data); 
        })
        .catch(error => {
            console.error('에러가 발생했습니다!', error); 
        });
}, []);
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

  const handleToggle = () => {
    const updatedUserdata = { email:userdata.email, isalarm: !userdata.isalarm };
  
    const url = '/room/alarm'; // URL이 '/room/alarm'에서 '/alarm'으로 변경되었습니다.
    axios.post(url, updatedUserdata) // entire updatedUserdata 객체를 전달합니다.
      .then(response => {
        console.log('알람 값이 업데이트되었습니다.');
        console.log(updatedUserdata.isalarm + updatedUserdata.email);
        setUserdata(updatedUserdata); // userdata 업데이트
      })
      .catch(error => {
        console.log('알람 값을 업데이트하는데 실패하였습니다.', error);
      });
      
}



    return (
        <div className="y_info-div">
          <img className="y_myimage" alt="" src={kermit}/>
          <div className="y_input-field">
            <input className="y_info-input" value={userdata.email}
            onChange={handleEmailChange}/>
          </div>
          <div className="y_input-field1">
          <input className="y_info-input" value={userdata.hp}
          onChange={handleHpChange}>
            </input>
          </div>
          <div className="y_input-field2">
            <div className="y_input-field3">
              <input className="y_info-input"
               style={{width:'80%'}}>
            </input>
            </div>
          </div>
          <div className="y_infoemail-p">Email</div>
          <div className="y_input-field4">
          <input className="y_info-input" value={userdata.user_name}
          onChange={handleUserNameChange}>
            </input>
          </div>
          <div className="y_infoname-p">Name</div>
          <div className="y_pwd-p">Password</div>
          <div className="y_hp-p">Phone</div>
          <div className="rectangle-parent">
            <div className="y_edit-div"/>
            <img className="y_icon-edit" alt="" src={edit}/>
          </div>
          <img className="eye-show-icon" alt="" src={eyeopen}  style={{cursor:'pointer'}} />
          <div className="y_info-p1">내 정보 관리</div>
          <button onClick={updateInfo} className="y_infoupdate-btn">
          수정완료
          </button>
          <div className="inner" />
          <img className="y_icon-bell" alt="" src={alarm} />
          <div className="y_info-p2">개인정보 변경</div>
          <div className="y_info-p3">회원님의 회원 정보를 변경하실 수 있습니다.</div>
          <div className="on-wrapper">
              <StyledSwitch  checked={userdata.isalarm || false} onChange={handleToggle}/>
          </div>
          <div className="div5">알람 허용</div>
          <div className="div6">{`받은 신고 수 `}</div>
          <div className="div7">고객센터</div>
          <img
            className="icon-arrow-right-circled"
            alt=""
            src={centergo}
          />
          <div
            className="icon-arrow-right-circled1">
              <p>1</p>
          </div>
          <img className="icon-emoji-sad" alt="" src={report} />
          <img
            className="y_back" style={{cursor:'pointer'}}
            alt="" 
            src={back}
          />
          <img
            className="icon-question-mark-circle"
            alt=""
            src={center}
          />
          <div className="rectangle-div" />
          <div className="child1" />
          <div className="child2" />
          <div className="child3" />
        </div>
      );
    };
export default UserInfo;
