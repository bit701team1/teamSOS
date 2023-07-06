import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/live.css';
import test from '../image/R1.gif';
import * as StompJS from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import alertImage from '../image/alert.png';
function AuctionLive(props) {
    const { roomId } = useParams();
    const [roomName, setRoomName] =useState('');
    const [anonymousCount, setAnonymousCount] = useState(0);
    const client = useRef();
    const [userName, setUserName] = useState('');
    const msgRef = useRef();
    const [msg,setMsg] = useState([]);

    useEffect(()=>{
        fetch('/room/info/'+roomId)
            .then(res=>res.json())
            .then(res=>{
                setRoomName(res.roomName);
                connect();
            });
    },[roomId]);

    useEffect(() => {
        if (anonymousCount > 0) {
            setUserName(`익명${anonymousCount}`);
        }
    }, [anonymousCount]);
    const connect = () => {//소켓 연결용 함수
        let sock =new SockJS('http://localhost:9003/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
        client.current = StompJS.Stomp.over(sock);
        let ws = client.current;
        ws.connect({},()=>{
            //연결 성공시 실행할 코드
            ws.subscribe('/sub/room/'+roomId,data=>{
                AddChat(data.body);
            });
            publish('ENTER', ''); // 익명 숫자를 서버로 전송하지 않고 빈 문자열로 전송
            // 일정 시간이 지난 후에 채팅이 끝났다는 알림을 표시
            setTimeout(() => {
                if (roomId !== null) {
                    alert("방송이 끝났습니다.");
                    window.location='/';
                }
            }, 60*1000); //
        });
    }
    const AddChat = (data) => {
        setMsg((prevMsg) => [...prevMsg, { id: Date.now(), message: data }]);
    };


    const publish = (type,userName,msg) => {
        client.current.send('/pub/msg', {}, JSON.stringify({
            type,
            roomId,
            userName,
            msg
        }));
    };

    const deleteMessage = (id) => {
        const updatedMessages = msg.map(item => {
            if (item.id === id) {
                return { ...item, showDeletedMessage: true };
            }
            return item;
        });
        setMsg(updatedMessages);
    };

    const enterKey =(e)=> {
        if(e.key==='Enter') {
            if(msgRef.current.value === '') {
                alert('값을 입력하세요');
                return;
            }
            else {
                publish('CHAT', userName, msgRef.current.value);
            }
        }
    };
    return (
        <div>
            <div className='y_logo'>A&A<br/><span style={{fontSize:'60px'}}>ARTE : ARENA</span></div>
            <div className='y_live'>
                <img alt='' src={test}></img>
            </div>
            <div className='y_title'>2023.7.6 Live 방송 </div>
            <span style={{fontSize:'25px',color:'#590209',cursor:"pointer"}}>작품 상세보기 >></span>
            <div className='y_chat'>
                {msg.map((item) => {
                    const { id, message, showDeletedMessage } = item;
                    const displayUserName = userName; // 사용자 이름 사용
                    return (
                        <div key={id}>
                            {showDeletedMessage ? (
                                <b style={{ color: '#FF6666'}}>메시지가 삭제되었습니다.</b>
                            ) : (
                                <>
                                    <b>{displayUserName}</b> {JSON.parse(message).msg}
                                    <i
                                        className="bi bi-trash"
                                        style={{ float: 'right', cursor: 'pointer' }}
                                        onClick={() => deleteMessage(id)}
                                    ></i>
                                    <img
                                        alt=""
                                        src={alertImage}
                                        style={{ float: 'right', width: '20px' }}
                                    ></img>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
                <input placeholder="보낼메세지" ref={msgRef} onKeyUp={enterKey} className='y_chatinput' />
                <i className="bi bi-arrow-right-circle" id='y_chatsend'
                    onClick={(e) => {
                        setUserName(userName); // 사용자 이름 설정
                        publish('CHAT',userName, msgRef.current.value);
                    }}
                >
                </i>
                <button className='y_pay'>$</button>
        </div>
    );
}

export default AuctionLive;