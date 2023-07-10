import React, {useEffect, useRef, useState} from 'react';
import '../css/auctionlive.css';
import info from '../image/y_info.png';
import send from '../image/y_send.png';
import donation from '../image/y_donation.png';
import bidding from '../image/y_bidding.png';
import {useParams} from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import test from '../image/짱구5.gif';
import alertImage from "../image/alert.png";
function AuctionLive(props) {
    const { roomId } = useParams();
    const [roomName, setRoomName] =useState('');
    const [anonymousCount, setAnonymousCount] = useState(0);
    const client = useRef();
    const [userName, setUserName] = useState('');
    const msgRef = useRef();
    const [msg,setMsg] = useState([]);
    const chatScreenRef = useRef(null);

    const scrollToBottom = () => {
        chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [msg]);
    const connect = () => {//소켓 연결용 함수
        let sock =new SockJS('http://localhost:9003/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
        client.current = StompJS.Stomp.over(sock);
        let ws = client.current;
        ws.connect({},(e)=>{
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
            }, 600*1000); //
        });
    }
    useEffect(() => {
        fetch('/room/info/' + roomId)
            .then(res => res.json())
            .then(res => {
                setRoomName(res.roomName);
            });

        connect();

        // 컴포넌트가 언마운트되면 소켓 연결 해제
        return () => {
            client.current.disconnect();
        };
    }, [roomId]);

    const AddChat = (data) => {
        setMsg((prevMsg) => [
            ...prevMsg,
            { id: Date.now(), message: data },
        ]);
    };



    const publish = (type, userName, msg) => {
        client.current.send(
            '/pub/msg',
            {},
            JSON.stringify({
                type,
                roomId,
                userName,
                msg,
            })
        );
        // 메시지 전송 후 입력창 초기화
        msgRef.current.value = '';
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

    const [isInputVisible, setInputVisible] = useState(false);

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleBlur = () => {
        setInputVisible(false);
    };


    return (
        <div className="y_auctionlive">
            <div className="y_auctionlive-child" />
            <div className="y_aa-arte-container">
                <p className="y_aa">
                    <span>{`    `}</span>
                    <span className="y_span">{` `}</span>
                    <span className="y_aa1">{`A&A`}</span>
                </p>
                <p className="y_arte-arena"> ARTE : ARENA</p>
            </div>
            <div className="y_livescreen">
                <img alt='' src={test}></img>
            </div>
            <div className="y_chatscreen" ref={chatScreenRef}>
                {msg.map((item) => {
                    const { id, message, showDeletedMessage } = item;
                    return (
                        <div key={id}>
                            {showDeletedMessage ? (
                                <b style={{ color: '#FF6666'}}>메시지가 삭제되었습니다.</b>
                            ) : (
                                <>
                                    <b style={{float:'left'}}> {JSON.parse(message).msg}</b>
                                    <i
                                        className="bi bi-trash"
                                        style={{ float: 'right', cursor: 'pointer' }}
                                        onClick={() => deleteMessage(id)}
                                    ></i>
                                    <img
                                        alt=""
                                        src={alertImage}
                                        style={{ float: 'right', width: '45px', cursor:"pointer" }}
                                    ></img><br/>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="y_donation-parent">
                <div className="y_donation">DONATION</div>
                <img className="y_icon-donate" alt="" src={donation} />
            </div>
            <div className="y_bidding-parent">
                <div className="y_bidding">BIDDING</div>
                <img className="y_biddingicon" alt="" src={bidding}/>
            </div>
            <div className="y_detail-parent">
                <div className="y_detail">DETAIL</div>
                <div className="y_send">SEND</div>
                <img className="y_infoicon" alt="" src={info} />
            </div>
            <img className="y_sendicon" alt="" src={send}
                 onClick={toggleInput} />
            {isInputVisible && (
                <input placeholder="  보낼메세지" ref={msgRef} onKeyUp={enterKey}
                    className="y_chatinput2"
                    onBlur={handleBlur}
                    autoFocus
                       onFocus={(e) => {
                           e.target.placeholder = ''; // 입력이 시작되면 플레이스홀더 텍스트를 빈 문자열로 변경합니다
                       }}
                      />
            )}
            <div className="y_header" />
        </div>
    );
}

export default AuctionLive;