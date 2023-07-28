import React, { useState } from 'react';

function RoomCreate(props) {
     //방 만드는 함수
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
        .catch(error=>{
            alert("방송이 끝났습니다");
        })
    }
    return (
        <div>
            <button onClick={handleRoomCreate} style={{backgroundColor:'yellow'}}>방만들기</button>
        </div>
    );
}

export default RoomCreate;