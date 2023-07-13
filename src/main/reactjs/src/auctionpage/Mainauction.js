import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
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
        if(name.length===0)
            return; //방제가 공백이면 리턴
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
    return (
        <div>
            <button onClick={RoomCreate} style={{backgroundColor:'yellow'}}
                    >방만들기</button>
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