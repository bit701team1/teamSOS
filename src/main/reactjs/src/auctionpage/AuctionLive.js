import React, {useEffect, useRef, useCallback, useState} from 'react';
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

import LiveStream from './LiveStream';//추가-DH

import DonateModal from "../y_modal/DonateModal";
import PortalPopup from "../y_modal/PortalPopup";
import BidModal from "../y_modal/BidModal";
import DetailModal from "../y_modal/DetailModal";
import ResultModal from "../y_modal/ResultModal";

function AuctionLive(props) {
    const [isFrameOpen, setFrameOpen] = useState(false);
    const [isFrame1Open, setFrame1Open] = useState(false);
    const [isFrame2Open, setFrame2Open] = useState(false);
    const [isFrame3Open, setFrame3Open] = useState(false);

    const { roomId } = useParams();
    const [roomName, setRoomName] =useState('');
    const client = useRef();
    const [userName, setUserName] = useState('');
    const msgRef = useRef();
    const [msg,setMsg] = useState([]);
    const chatScreenRef = useRef(null);
    const openFrame = useCallback(() => {
        setFrameOpen(true);
    }, []);

    const closeFrame = useCallback(() => {
        setFrameOpen(false);
    }, []);

    const openFrame1 = useCallback(() => {
        setFrame1Open(true);
    }, []);

    const closeFrame1 = useCallback(() => {
        setFrame1Open(false);
    }, []);

    const openFrame2 = useCallback(() => {
        setFrame2Open(true);
    }, []);

    const closeFrame2 = useCallback(() => {
        setFrame2Open(false);
    }, []);

    const openFrame3 = useCallback(() => {
        setFrame3Open(true);
    }, []);

    const closeFrame3 = useCallback(() => {
        setFrame3Open(false);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            openFrame3();
        }, 10 * 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [openFrame3]);
    const scrollToBottom = () => {
        chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    };
    useEffect(() => {
        scrollToBottom();// 채팅 스크롤을 아래로 고정
    }, [msg]);

    useEffect(() => {
        fetch('/room/info/' + roomId)
            .then(res => res.json()) // 메서드로부터 받은 응답 데이터를 json 형식으로 변환하는 과정임
            .then(res => {
                setRoomName(res.roomName); // json데이터를 처리하는 부분
            });
        // 아래 코드 추가: 로그인되지 않은 사용자를 위한 임의의 이름 설정
        if (!userName) {
            setUserName('Guest' + Math.floor(Math.random() * 10000));  // "Guest"라는 이름에 4자리 임의의 숫자를 추가
        }
        connect();
        // 컴포넌트가 언마운트되면 소켓 연결 해제
        return () => {
            client.current.disconnect();
        };
    }, [roomId]); // 자꾸 채팅이 두개씩 들어가서 추가한 코드

    const connect = () => {//소켓 연결용 함수
        let sock =new SockJS('http://localhost:9003/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
        client.current = StompJS.Stomp.over(sock); //StompJS를 사용하여 소켓 연결을 관리하는 클라이언트 객체를 생성
        let ws = client.current;
        ws.connect({},()=>{
            //연결 성공시 실행할 코드
            ws.subscribe('/sub/room/'+roomId,data=>{
                AddChat(data.body);// 'sub/room/{roomId}' 채널에서 데이터를 받아와서 AddChat 함수로 전달합니다
            });
            publish('ENTER', '');
            // 일정 시간이 지난 후에 채팅이 끝났다는 알림을 표시
        });
    }
    setTimeout(() => {
        alert("방송이 끝났습니다.");
        window.location='/result'; // 방송이 끝나면 홈으로 이동
    }, 600*1000); // 시간
    const AddChat = (data) => {
        setMsg((prevMsg) => [
            ...prevMsg, // setMsg 함수를 사용하여 prevMsg 상태를 업데이트하는데,
            // 새로운 메시지를 이전 메시지 배열의 뒤에 추가하고자 함
            { id: Date.now(), message: data } // 메세지 삭제할 때를 위해 시간을 넣어줌
        ]);
    };

    const publish = (type, userName, msg) => {
        client.current.send( //send : StompJS라이브러리에서 제공하는 메서드:메시지 전송 역할
            '/pub/msg', // 목적지 주소
            {}, // 메시지 전송에 필요한 헤더를 지정 
            JSON.stringify({ // 실제로 전송할 메시지 내용
                type, // ENTER(입장할 때), CHAT(메세지 쓸 때)
                roomId, //방 주소
                userName, // 보낸 사람
                msg, // 메세지
            })
            //데이터 보낼때 json 형식을 맞추어 보낸다.
        );
        // 메시지 전송 후 입력창 초기화
        msgRef.current.value = '';
    };
    const deleteMessage = (id) => {
        const updatedMessages = msg.map(item => {//배열 생성
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
            } // 값 입력 안하고 엔터누르면 alert창 뜸
            else {
                publish('CHAT', userName, msgRef.current.value); // 값 입력하면 publish로 값 넘어감
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
        <>
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
                <LiveStream/>
            </div>
            <div className='y_banner'>
                배너임
            </div>
            <div className='y_banner'>
                배너임
            </div>
            <div className="y_chatscreen" ref={chatScreenRef}>
                {msg.map((item) => {
                    const { id, message, showDeletedMessage } = item;
                    const Message = JSON.parse(message);
                    const isCurrentUser = Message.userName === userName;  // userName은 현재 사용자의 이름을 가지고 있는 변수라고 가정
                    return (
                        <div key={id} className={isCurrentUser ? 'message-right' : 'message-left'} > {/*왼쪽은 보낸사람 오른쪽은 현재 보내는 사람 */}
                            {showDeletedMessage ? (
                                <b style={{ color: '#FF6666'}}>메시지가 삭제되었습니다.</b>
                            ) : (
                                <>
                                    <b>{Message.msg}</b>
                                    {!isCurrentUser && (
                                        <>
                                            <i
                                                className="bi bi-trash"
                                                style={{ cursor: 'pointer', float: 'right' ,marginRight:10}}
                                                onClick={() => deleteMessage(id)}
                                            ></i>
                                            <img
                                                alt=""
                                                src={alertImage}
                                                style={{ width: '45px', cursor: "pointer", float: 'right' }}
                                            ></img>
                                        </>
                                    )}
                                    <br/>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="y_donation-parent">
                <div className="y_donation">DONATION</div>
                <img className="y_icon-donate" alt="" src={donation} onClick={openFrame} />
            </div>
            <div className="y_bidding-parent">
                <div className="y_bidding">BIDDING</div>
                <img className="y_biddingicon" alt="" src={bidding} onClick={openFrame1}/>
            </div>
            <div className="y_detail-parent">
                <div className="y_detail" >DETAIL</div>
                <div className="y_send" >SEND</div>
                <img className="y_infoicon" alt="" src={info}  onClick={openFrame2} />
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
            <div className="iphone-14-child3" onClick={openFrame3} />

        </div>
            {isFrameOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeFrame}
                >
                    <DonateModal onClose={closeFrame} />
                </PortalPopup>
            )}
            {isFrame1Open && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeFrame1}
                >
                    <BidModal onClose={closeFrame1} />
                </PortalPopup>
            )}
            {isFrame2Open && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeFrame2}
                >
                    <DetailModal onClose={closeFrame2} />
                </PortalPopup>
            )}
            {isFrame3Open && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeFrame3}
                >
                    <ResultModal onClose={closeFrame3} />
                </PortalPopup>
            )}
        </>
    );
};

export default AuctionLive;