import React from 'react';
import '../css/auctionlist.css';
import oh from '../image/ohmakase.jpeg';
function AuctionList(props) {
    const photo = process.env.REACT_APP_SUICONURL;
    return (
    <div className="y_auctionlist-div">
      <b className="y_atlist-p1">오늘의 경매 리스트</b>
      <div className="y_atlist-p2">특별한 사람과 특별한 시간을 구입하세요</div>
      <img className="y_atlist-mainimg" alt="" src={oh} />
      <div className="y_atlist-namediv" />
      <div className="y_atlist-p3">{`김성학의 오마카세 `}</div>
      <div className="y_atlist-p4">개발자 김성학의 특별한 코스 요리</div>
      <img
        className="y_liveon-icon"
        alt=""
        src={`${photo}y_liveon.svg`}
      />
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