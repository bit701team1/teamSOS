import React, {useEffect, useRef, useCallback, useState} from 'react';
import '../css/auctionlive.css';
import info from '../image/y_info.png';
import send from '../image/y_send.png';
import donation from '../image/y_donation.png';
import bidding from '../image/y_bidding.png';
import {useParams} from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import alertImage from "../image/alert.png";

import LiveStream from './LiveStream';//추가-DH

import DonateModal from "../y_modal/DonateModal";
import PortalPopup from "../y_modal/PortalPopup";
import BidModal from "../y_modal/BidModal";
import DetailModal from "../y_modal/DetailModal";
import ResultModal from "../y_modal/ResultModal";
import axios from "axios";
import ResultPage from "./ResultPage";

function AuctionLive(props) {
    const [hasBid, setHasBid] = useState(false); // 현재 로그인된 사용자의 입찰 여부를 관리하는 상태 변수
    const [isFrameOpen, setFrameOpen] = useState(false); // 도네이션 모달
    const [isFrame1Open, setFrame1Open] = useState(false); // 입찰 모달
    const [isFrame2Open, setFrame2Open] = useState(false); // 상세정보 모달
    const [isFrame3Open, setFrame3Open] = useState(false); // 방송결과 모달
    const { roomId } = useParams(); // 방 id
    const [roomName, setRoomName] =useState('');
    const client = useRef(); // 클라이언트
    const [userName, setUserName] = useState(''); //email
    const msgRef = useRef(); // 메세지 함수
    const [msg,setMsg] = useState([]); // 메세지 내용
    const chatScreenRef = useRef(null); 
    /////////////////////////////////모달////////////////////////////////
    const openFrame = useCallback(() => {
        setFrameOpen(true);
    }, []);

    const closeFrame = useCallback(() => {
        setFrameOpen(false);
    }, []);

    const openFrame1 = useCallback(() => {
        if (hasBid) {
            alert("이미 입찰한 이용자입니다.");
        } else {
            setFrame1Open(true);
        }
    }, [hasBid]);

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
        },60* 1000 );

        return () => {
            clearTimeout(timer);
        };
    }, [openFrame3]);
    /////////////////////////////////모달////////////////////////////////


    /*채팅 스크롤*/
    const scrollToBottom = () => {
        chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    };
    useEffect(() => {
        scrollToBottom();
    }, [msg]);  // 채팅을 아래로 고정
    
    /* 방 id 가져오기 , 로그인한 사용자 이메일 가져오기*/
    useEffect(() => {
        fetch('/room/info/' + roomId)
            .then(res => res.json()) // 메서드로부터 받은 응답 데이터를 json 형식으로 변환하는 과정임
            .then(res => {
                setRoomName(res.roomName); // json데이터를 처리하는 부분
            });
        const getUser = async () => {
            try {
                const email = await axios.get('/room/emailuser'); 
                setUserName(email.data);// 이메일 출력
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        getUser();
        connect();
        // 컴포넌트가 언마운트되면 소켓 연결 해제
        return () => {
            client.current.disconnect(); // 채팅이 두번 전송되는 것을 방지하기 위함
        };
    }, [roomId]);


    /* 소켓연결 */
    const connect = () => { //소켓 연결용 함수
        let sock = new SockJS('http://localhost:9003/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
        client.current = StompJS.Stomp.over(sock); //StompJS를 사용하여 소켓 연결을 관리하는 클라이언트 객체를 생성
        let ws = client.current;
        ws.connect({}, () => {
            //연결 성공시 실행할 코드
            ws.subscribe('/sub/room/' + roomId, data => {
                const receivedMsg = JSON.parse(data.body);
                if (receivedMsg.type === 'DELETE') {
                    // 해당 메시지 ID를 가진 메시지를 삭제
                    //preMsg 배열에서 receivedMsh의 msgId와 다른 메시지만 남기도록 필터링 역할
                    setMsg(prevMsg => prevMsg.filter(message => message.msgId !== receivedMsg.msgId));
                } else if(receivedMsg.type === 'KICK'){
                    const kickUser = JSON.parse(data.body).userName;
                    if(kickUser === userName){
                        alert('나가');
                        window.location.href = '/';
                    }
                } 
                else {
                    AddChat(data.body,  receivedMsg.msgId);
                }
            });
           
            //입장
            publish('ENTER', '');
        });
    };
    /*채팅 추가 */
    const AddChat = (data, msgId) => { // 메시지를 추가하는 함수, data와 msgId를 인자로 받음
        setMsg((prevMsg) => [
            ...prevMsg, // 이전 메시지 배열을 펼쳐서 새 배열을 만듦
            { message: data , msgId: msgId} // 새로운 메시지 객체를 추가, 메시지 내용과 msgId 속성을 포함
        ]);
    };
    /* 관리자에게 권한 주기  */
    const [admin, setAdmin] = useState('');
    useEffect(() => {
        axios.get('/room/adminpower')
        .then((response) => {
            if(response.status === 200) {
                setAdmin(true);
            }
        })
        .catch((error) => {
            setAdmin(false);
        });
    }, []);
    /* 클라이언트에 채팅 보내기*/
    const publish = (type,userName, msg,msgId,roomId) => {
        client.current.send( //send : StompJS라이브러리에서 제공하는 메서드:메시지 전송 역할
            '/pub/msg', // 목적지 주소
            {}, // 메시지 전송에 필요한 헤더를 지정
            JSON.stringify({ // 실제로 전송할 메시지 내용
                type, // ENTER(입장할 때), CHAT(메세지 쓸 때)
                roomId, //방 주소
                userName, // 보낸 사람
                msg, // 채팅 메세지
                msgId // 채팅 랜덤 id
            })
            //데이터 보낼때 json 형식을 맞추어 보낸다.
        )
        // 메시지 전송 후 입력창 초기화
        msgRef.current.value = '';
    };
   /* 채팅 메세지 삭제 함수*/
    const deleteMessage = (msgId) => {
        // 서버에 메시지 삭제 이벤트를 전송
        setMsg((prevMsg) => prevMsg.filter(message => message.msgId !== msgId));
        client.current.send(
            '/pub/msg', 
            {}, 
            JSON.stringify({
                type: 'DELETE', 
                roomId, 
                userName, 
                msg:'', // 메세지를 지우겠다
                msgId
            })
        )
    };
    /* 강퇴 기능*/
    const kick = (kickUser) =>{ // 강퇴할 대상의 userName을 인자로 받는다.
       
        client.current.send( // 웹소켓 서버로 강퇴 이벤트를 보낸다.
            '/pub/msg',
            {},
            JSON.stringify({
                type:'KICK',
                roomId, 
                userName: kickUser,  // 강퇴할 대상의 userName을 보낸다.
                msg: '' // 메시지는 비워둔다.
            })
        )
        console.log(kickUser + " was kicked out."); // 강퇴당한 사용자의 userName을 출력한다.
    };
    /* 신고 수 증가 */
    // const report = (UserName, msg) =>{
    //     client.current.send(
    //         '/pub/msg',
    //         {},
    //         JSON.stringify({
    //             userName,
    //             msg
    //         })
    //     )
    // }
    const report = (userName, msg) => {
        const requestBody = {
          userName,
          msg
        };
      
        let url ='/room/insertreport';
          axios.post(url,requestBody)
         
          .then(response => response.json())
          .then(data => {
            console.log(msg +"," + userName);
          })
          .catch(error => {
            // 오류 처리
          });
      };
      
    /*입력창에 채팅 보냈을 때 실행 */
    const enterKey =(e)=> {
        if (e.key === 'Enter') {// 사용자가 Enter 키를 눌렀을 때 실행
            if (msgRef.current.value === '') {
                alert('값을 입력하세요');
                return;
            } // 값 입력 안하고 엔터누르면 alert창 뜸
            else {
                //입력하면 
                const msgId = Math.random().toString(); //msgId 랜덤값으로 보냄 
                    publish('CHAT', userName, msgRef.current.value, msgId, roomId); // 채팅 메시지 전송
                    // console.log("msgId:", msgId);
                }
        }
    }
    /*send 버튼 클릭시 입력창 띄움 */
    const [isInputVisible, setInputVisible] = useState(false);
    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleBlur = () => {
        setInputVisible(false); // 평소에는 안보이게
    };
    useEffect(() => {
        console.log("roomname>>" + roomName);

        const checkDuplicateBid = async () => {
            try {
                const response = await axios.get(`/product/check-duplicate?productName=${roomName}&userEmail=${userName}`);
                console.log("response>>"+response)
                if (response.status === 200) {
                    const responseData = response.data; // 서버 응답 데이터
                    if (responseData === "이미 입찰한 이용자입니다.") {
                        setHasBid(true);
                    } else {
                        setHasBid(false);
                    }
                } else {
                    console.log("Failed to check duplicate bid:", response);
                }
            } catch (error) {
                console.error("Failed to check duplicate bid:", error);
            }
        };

        checkDuplicateBid();
    }, [roomName, userName]);


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
                    <p className="y_arte-arena">AR</p>
                </div>
                <div className="y_livescreen">
                    <LiveStream/>
                </div>
                <div className='y_banner'>
                    배너임
                </div>

                <div className="y_chatscreen" ref={chatScreenRef}>
                    {msg.map((item) => {
                        const {message,msgId} = item; // 메세지
                        const Message = JSON.parse(message); // 메세지 json으로 가져옴
                        const isCurrentUser = Message.userName === userName;  // userName은 현재 사용자의 이름을 가지고 있는 변수라고 가정
                        return (
                            <div key={msgId} className={isCurrentUser ? 'message-right' : 'message-left'} > {/*왼쪽은 보낸사람 오른쪽은 현재 보내는 사람 */}
                                
                                        <b>{Message.userName}  {Message.msg}</b>
                                        {!isCurrentUser && admin &&(  //현재로그인한사용자가 아닌데 관리자면 삭제아이콘보임
                        <i
                            className="bi bi-trash"
                            style={{ cursor: 'pointer', float: 'right' ,marginRight:10}}
                            onClick={() => {
                                console.log("msgId:", msgId);
                                deleteMessage(msgId)}}
                        ></i>
                    )}
                     {!isCurrentUser && admin &&(  //현재로그인한사용자가 아닌데 관리자면 강퇴아이콘 보임
                <i
                    className="bi bi-person-x"
                    style={{ cursor: 'pointer', float: 'right' ,marginRight:10}}
                    onClick={() => {
                        kick(Message.userName);
                    }
                    }
                    
                ></i>
             )}
                    {!isCurrentUser && !admin && ( //현재 로그인한 사용자가 아닌데 일반사용자면 신고아이콘 보임
                        <img
                            alt=""
                            src={alertImage}
                            style={{ width: '45px', cursor: "pointer", float: 'right' }}
                            onClick={() => {
                                report(Message.userName, Message.msg);
                            }}
                        ></img>
                    )}
                    <br/>
                             
                      
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
                    <input placeholder=" 30자까지 입력 가능합니다"
                    ref={msgRef} onKeyUp={enterKey}
                           className="y_chatinput2"
                           onBlur={handleBlur}
                           maxLength={30}
                           onFocus={(e) => {
                               e.target.placeholder = ''; 
                            // 입력이 시작되면 플레이스홀더 텍스트를 빈 문자열로 변경합니다
                           }}
                    />
                )}
                <div className="y_header" />
                <div className="iphone-14-child3" onClick={openFrame3} />
            </div>
            {/*///////////////////////* 모달 /////////////////////////*/}
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
                    <BidModal onClose={closeFrame1} roomName={roomName}/>
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
                    <ResultModal onClose={closeFrame3} roomName={roomName}/>
                </PortalPopup>
            )}
             {/*///////////////////////* 모달 /////////////////////////*/}

        </>
    );
};

export default AuctionLive;