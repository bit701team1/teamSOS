import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {styled} from '@mui/system';
import Switch from '@mui/material/Switch';
import axios from "axios";
// Switch component with custom styles
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

function Mainauction(props) {
    const [lst,setList]=useState([]);//방 목록
    const navigate=useNavigate();
    const [message, setMessage] = useState("");
    const location = useLocation();

    const logincheck = async (roomId) =>{
        try {
            await axios.get('/lobby/logincheck');
            navigate(`/room/${roomId}`);
        } catch (error) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    };
    useEffect(()=>{
        fetch('/lobby/list') //주어진 url에 http요청을 보내고 해당url에서 반환하는 응답을 promise로 반환
            .then(res=>res.json())
            .then(res=>{
                setList(res);
            });
    },[]);
    const RoomCreate=(e)=>{ //방 만드는 함수
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
            body:JSON.stringify({
                name
            })
        })//post는 option들을 중괄호에 써줘야함
        // if (response.status === 401) {
        //     alert('관리자만 방을 만들 수 있습니다.');
        //     return;
        // }
        //
        // if (!response.ok) {
        //     alert('방을 만들지 못했습니다. 다시 시도해주세요.');
        //     return;
        // }
        // const res = await response.json();
        // if (res === null) {
        //     alert('방을 만들지 못했습니다. 다시 시도해주세요.');
        //     return;
        // }
             .then(res=>res.json())
             .then(res=>{
                 setList([
                     res,
                     ...lst
                 ])
             })
             
    }
    const [userdata, setUserdata] = useState('');
    
    useEffect(() => {
        axios.get('/room/userdata')
            .then(response => {
                setUserdata(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });
    }, []);
       
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
    };
      
      return (
        
          <div>
            <b>{userdata.email}</b>
              <button onClick={RoomCreate} style={{backgroundColor:'yellow'}}>방만들기</button>
              <hr/> 
              <StyledSwitch  checked={userdata.isalarm || false} onChange={handleToggle}/>
              <ul>
                  {
                      lst.map((item,idx)=>{
                          return (
                              <li key={idx} onClick={() => logincheck(item.roomId)} style={{cursor:'pointer'}}>
                                  {idx+1}. {item.roomName}
                              </li>
                          );
                      })
                  }
              </ul>
             
          </div>
      );
}
  
export default Mainauction;