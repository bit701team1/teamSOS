import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
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

function Mainauction({onRoomCreate}) {
    const navigate=useNavigate();
    const [lst,setList]=useState([]);//방 목록
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState(null);
    
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
       
   

      return (
        
          <div>
            <b>{userdata.email}</b>
              <hr/> 
             
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