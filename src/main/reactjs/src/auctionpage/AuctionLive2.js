import React, {useEffect, useRef, useCallback, useState} from 'react';
import '../css/auctionlive2.css';
import img from '../image/스폰지밥1.gif';
import AuctionInfo from '../auctionmodal/AuctionInfo';
import AuctionBid from '../auctionmodal/AuctionBid';
import AuctionEnd from '../auctionmodal/AuctionEnd';
import PortalPopup from '../auctionmodal/PortalPopup';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
function AuctionLive2(props) {
  const navigate = useNavigate();


  const [hasBid, setHasBid] = useState(false); // 현재 로그인된 사용자의 입찰 여부를 관리하는 상태 변수
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isFrame1Open, setFrame1Open] = useState(false);
  const [isFrame2Open, setFrame2Open] = useState(false);
  const { roomId } = useParams(); // 방 id
  const [roomName, setRoomName] =useState('');
  const client = useRef(); // 클라이언트
  const [userName, setUserName] = useState(''); //유저이름
  const [user, setUser] = useState(''); //
  const msgRef = useRef(); // 메세지 함수
  const [msg,setMsg] = useState([]); // 메세지 내용

  const chatScreenRef = useRef(null); 
  const photo = process.env.REACT_APP_SUICONURL;
  const productName = roomName;
    /////////////////////////모달////////////////////////////

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
 /////////////////////////모달////////////////////////////
useEffect(()=>{

  const checkDuplicateBid = async () => {
      try {
          const response = await axios.get(`/product/check-duplicate?productName=${roomName}&userEmail=${userName}`);
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
    //중복실행 수정(빈값이 아닐때만 실행)
     if (roomName !== "" && userName !== "") {
         checkDuplicateBid();
     }
}, [roomName, userName]);

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
          
        }).catch(error => {
          alert("방송이 끝났습니다");
          navigate('/');
        })
    const getUser = async () => {
        try {
            const user_name = await axios.get('/room/emailuser');
            setUserName(user_name.data);

        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };
    const getUserName = async () => {
      try {
          const user = await axios.get('/room/username');
          setUser(user.data);
          console.log(user.data); 
          
      } catch (error) {
          console.error("Failed to fetch user:", error);
      }
  };
    getUser();
    getUserName();
    connect();
    // 컴포넌트가 언마운트되면 소켓 연결 해제
    return () => {
        client.current.disconnect(); // 채팅이 두번 전송되는 것을 방지하기 위함
    };
}, [roomId]);

   /* 소켓연결 */
   const connect = () => { //소켓 연결용 함수
    // let sock = new SockJS('http://localhost:9003/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
       let sock = new SockJS('http://175.45.193.12/ws'); //endpoint 주소 소켓을 저기로 연결하겠다
    client.current = StompJS.Stomp.over(sock); //StompJS를 사용하여 소켓 연결을 관리하는 클라이언트 객체를 생성
    let ws = client.current;
    ws.connect({}, () => {
        ws.subscribe('/sub/room/' + roomId, data=> {
            const receivedMsg = JSON.parse(data.body);
            if (receivedMsg.type === 'DELETE') {
                // 해당 메시지 ID를 가진 메시지를 삭제
                //preMsg 배열에서 receivedMsh의 msgId와 다른 메시지만 남기도록 필터링 역할
                setMsg(prevMsg => prevMsg.filter(message => message.msgId !== receivedMsg.msgId));
            } else if(receivedMsg.type === 'KICK'){
              const kickUser = JSON.parse(data.body).userName;
              // 현재 로그인한 사용자가 강퇴당하는 사용자와 같은지 확인
              if(kickUser === userName){
                  navigate('/');
              }
            } else if(receivedMsg.type === 'LIVE_END') {
              openFrame2(); // 방송 종료 모달을 띄웁니다.
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
    const now = new Date();
    const timeString = now.toLocaleTimeString('UTC', { hour: '2-digit', minute: '2-digit' });
    setMsg((prevMsg) => [
        ...prevMsg, // 이전 메시지 배열을 펼쳐서 새 배열을 만듦
        { message: data , msgId: msgId, date: timeString} // 새로운 메시지 객체를 추가, 메시지 내용과 msgId 속성을 포함
    ]);
};
/* 강퇴 기능*/
const kick = (kickUser) =>{ // 강퇴할 대상의 userName을 인자로 받는다.
  client.current.send( // 웹소켓 서버로 강퇴 이벤트를 보낸다.
      '/pub/msg',
      {},
      JSON.stringify({
          type:'KICK',
          roomId,
          userName :kickUser // 강퇴할 대상의 userName을 보낸다.
      })
  )
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
   const publish = (type,userName, msg,msgId,roomId,user, date) => {
    client.current.send( //send : StompJS라이브러리에서 제공하는 메서드:메시지 전송 역할
        '/pub/msg', // 목적지 주소
        {}, // 메시지 전송에 필요한 헤더를 지정
        JSON.stringify({ // 실제로 전송할 메시지 내용
            type, // ENTER(입장할 때), CHAT(메세지 쓸 때)
            roomId, //방 주소
            userName, // 보낸 사람
            msg, // 채팅 메세지
            msgId, // 채팅 랜덤 id
            date, // 현재시간
            user
        })
        //데이터 보낼때 json 형식을 맞추어 보낸다.
    )
    // 메시지 전송 후 입력창 초기화
    msgRef.current.value = '';
    console.log('user : '+user);
};
  const modalopen = () =>{
    client.current.send(
      '/pub/msg', 
      {}, 
      JSON.stringify({
          type: 'LIVE_END', 
          roomId
      })
  )
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
            user,
            msg:'', // 메세지를 지우겠다
            msgId
        })
    )
};

  
const [reported, setReported] = useState(false);
/* 신고 기능*/
const report = (userName, msg) => {
  if(reported) return; // 이미 보고됨, 추가 보고 방지
  const requestBody = {
    userName,
    msg
  };
  let url ='/room/insertreport';
    axios.post(url,requestBody)
    .then(data => {
        alert("신고되었습니다");
        setReported(true); // 보고 완료
    })
    .catch(error => {
      alert("오류야");
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
            publish('CHAT', userName, msgRef.current.value, msgId, roomId, user);
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

  function maskUserName(user) {
    if (user.length <= 2) {
      return user;
    } else {
      const maskedPart = '*'.repeat(user.length - 1) + user.slice(-1);
      return maskedPart;
    }
  }
    return (
      <>
        <div className="y_auction-div">
        <img className="y_auction-img" alt="" src={img}/>
        {admin &&
        <button className="y_liveend-btn" onClick={modalopen}>방송종료</button>
        }
        <img
          className="y_back-icon"
          alt=""
          src={`${photo}y_back.svg`}
        />
        <div className="y_icon-div1" />
        <div className="y_icon-div2" />
        <div className="y_icon-div3" />
        <img className="y_auctioninfo" alt="" src={`${photo}y_info.svg`} style={{cursor:'pointer'}}
        onClick={openFrame} />
        <img className="y_auctionbid" alt="" src={`${photo}y_coin.svg`}  style={{cursor:'pointer'}} 
        onClick={openFrame1} />
        <div className="y_chatscreen"  ref={chatScreenRef}>
        {msg.map((item) => {
                        const {message,msgId} = item; // 메세지
                        const Message = JSON.parse(message); // 메세지 json으로 가져옴
                        const isCurrentUser = Message.userName === userName;  // userName은 현재 사용자의 이름을 가지고 있는 변수라고 가정
                        return (
                            <div key={msgId} className={isCurrentUser ? 'message-right' : 'message-left'} > {/*왼쪽은 보낸사람 오른쪽은 현재 보내는 사람 */}
                                       {isCurrentUser &&(
                                         <b style={{fontSize:'10px', color:'gray'}}>{item.date}</b>
                                        )}
                                        &nbsp;
                                        <b>{maskUserName(Message.user)} : {Message.msg}</b>
                                        {!isCurrentUser && admin &&(  //현재로그인한사용자가 아닌데 관리자면 삭제아이콘보임
                        <i
                            className="bi bi-trash" 
                            style={{ cursor: 'pointer' ,marginRight:5}}
                            onClick={() => {
                                console.log("msgId:", msgId);
                                deleteMessage(msgId)}}
                        ></i>
                    )}
                     {!isCurrentUser && admin &&(  //현재로그인한사용자가 아닌데 관리자면 강퇴아이콘 보임
                <i
                    className="bi bi-person-x"
                    style={{ cursor: 'pointer', marginRight:10}}
                    onClick={() => {
                        kick(item.userName);
                    }
                    }
                    
                ></i>
             )}
             {!isCurrentUser && !admin && ( //현재 로그인한 사용자가 아닌데 일반사용자면 신고아이콘 보임
                        <img
                            alt=""
                            src={`${photo}alert.png`}
                            style={{ width: '18px', cursor: "pointer", marginBottom:6 ,marginLeft:5}}
                            onClick={() => {
                                report(Message.userName, Message.msg);
                            }}
                        ></img>
                    )}
                     {!isCurrentUser &&(
                       <b style={{fontSize:'10px', color:'gray'}}>{item.date}</b>
                        )}
                    <br/>
                    
             </div>
                   );
                   
              })}
        </div>
        <img className="y_auctionsend" alt="" src={`${photo}y_msgsend.svg`}
        style={{cursor:'pointer'}} 
        onClick={toggleInput}/>
         {isInputVisible && (
                    <input placeholder=" 30자까지 입력 가능합니다"
                    ref={msgRef} onKeyUp={enterKey}
                           className="y_chatinput3"
                           onBlur={handleBlur}
                           maxLength={30}
                           onFocus={(e) => {
                               e.target.placeholder = ''; 
                            // 입력이 시작되면 플레이스홀더 텍스트를 빈 문자열로 변경합니다
                           }}
                    />
                  )}
      </div>
      {/* 모달 */}
      {isFrame2Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
        >
          <AuctionEnd onClose={closeFrame2} roomName={roomName} roomId={roomId}/>
        </PortalPopup>
      )}
        {isFrameOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeFrame}
          >
            <AuctionInfo onClose={closeFrame} />
          </PortalPopup>
        )}
        {isFrame1Open && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeFrame1}
          >
            <AuctionBid onClose={closeFrame1} roomName={roomName} userName={userName} productName={productName}/>
          </PortalPopup>
        )}
      </>
    );
  };
export default AuctionLive2;