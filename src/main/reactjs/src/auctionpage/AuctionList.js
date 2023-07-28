import React, { useEffect, useState } from 'react';
import '../css/auctionlist.css';
import oh from '../image/ohmakase.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AuctionList({onRoomCreate}) {
    const photo = process.env.REACT_APP_SUICONURL;
    const navigate=useNavigate();
    const [lst,setList]=useState([]);//방 목록
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
    <div className="y_auctionlist-div">
      <b className="y_atlist-p1">오늘의 경매 리스트</b>
      <div className="y_atlist-p2">특별한 사람과 특별한 시간을 구입하세요</div>
      <img className="y_atlist-mainimg" alt="" src={oh} />
      <div className="y_atlist-namediv" />
      <div className="y_atlist-p3">{`김성학의 오마카세 `}</div>
      <div className="y_atlist-p4">개발자 김성학의 특별한 코스 요리</div>
      {
    lst.length > 0 ?
      lst.map((item, idx) => {
        const liveimg = item.roomId ? `${photo}y_liveon.svg` : `${photo}y_liveoff.svg`;
      
        return (
          <div key={idx} onClick={() => item.roomId && logincheck(item.roomId)}>
            <img className="y_liveon-icon" alt="" src={liveimg} />
          </div>
        );
      }) 
      :
      <div>
        <img className="y_liveoff-icon" alt="" src={`${photo}y_liveoff.svg`} />
      </div>
}      <div className="y_atlist-heart">
          <i class="bi bi-heart-fill" style={{color:'#fe7171'}}></i>
       </div>
      <b className="y_atlist-p5">다음 경매 리스트</b>
      <img className="y_atlist-imgbox" alt="" src={`${photo}dateimg1.jpg`}/>
      <img className="y_auctionlist-div2" alt="" src={`${photo}dateimg2.jpg`} />
      <div className="y_atlist-text1" />
      <div className="y_atlist-text2" />
      <div className="y_atlist-p6">조경철과 굴렁쇠 데이트</div>
      <div className="y_auctionlist-div3">
        <p className="y_atlist-p">이수연 개발자와 식사</p>
        <p className="y_atlist-p">데이트</p>
      </div>
      <div className="y_auctionlist-div4">
        <p className="y_atlist-p">{`굴렁쇠를 굴리며 `}</p>
        <p className="y_atlist-p">과거 - 현재 - 미래를 잇는 시간</p>
      </div>
      <div className="y_auctionlist-div5">
        <p className="y_atlist-p">이수연 개발자와 함께 식사를 하</p>
        <p className="y_atlist-p">며 다양한 이야기를 나눠보세요.</p>
      </div>
    </div>
    );
}

export default AuctionList;