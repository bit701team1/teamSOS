import React, { useEffect, useState } from 'react';
import '../css/auctionlist.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AuctionList({ onRoomCreate }) {
  const photo = process.env.REACT_APP_SUICONURL;
  const navigate = useNavigate();
  const [lst, setList] = useState([]);//방 목록

  //로그인 확인하는 부분
  const logincheck = async (roomId) => {
    try {
      await axios.get('/lobby/logincheck');
      navigate(`/room/${roomId}`);
    } catch (error) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  //방송 버튼 생기는 부분
  useEffect(() => {
    fetch('/lobby/list') 
      .then(res => res.json())
      .then(res => {
        setList(res);
      });
  }, []);

  return (
    <div className="y_auctionlist-div">
      <b className="y_atlist-p1">오늘의 경매 리스트</b>
      <div className="y_atlist-p2">특별한 사람과 특별한 시간을 구입하세요</div>
      <img className="y_atlist-mainimg" alt="" src={`${photo}ohmakase.jpeg`} />
      <div className="y_atlist-namediv" />
      <div className="y_atlist-p3">{`김성학의 오마카세 `}</div>
      <div className="y_atlist-p4">개발자 김성학의 특별한 코스 요리</div>
      {/* 버튼 이미지 바뀌는 부분 */}
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
        <i class="bi bi-heart-fill" style={{ color: '#fe7171' }}></i>
      </div>
      <b className="y_atlist-p5">다음 경매 리스트</b>
      <div className='swiper-container-main non-scroll'>
      <div className='swiper-inner'>
      <img className="y_atlist-imgbox" alt="" src={`${photo}dateimg1.jpg`} />
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
    </div>
    </div>
  );
}

export default AuctionList;