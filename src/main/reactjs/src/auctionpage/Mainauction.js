import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
function Mainauction(props) {
    const [lst,setList]=useState([]);//방 목록

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
            <button onClick={RoomCreate} style={{backgroundColor:'yellow'}}>방만들기</button>
            <hr/>
            <ul>
                {
                    lst.map((item,idx)=>{
                        return <Link key={idx} to={'/room/'+item.roomId}><li>{idx+1}. {item.roomName}</li></Link>
                        //리액트에서는 a태그 안씀
                    })
                }
            </ul>
        </div>
    );
}
export default Mainauction;