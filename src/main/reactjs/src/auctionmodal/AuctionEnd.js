import "../css/auctionend.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
const AuctionEnd = ({ onClose, roomName }) => {
  const navigate = useNavigate();
  const photo = process.env.REACT_APP_SUICONURL;
  return (
    <div className="y_end-div">
      <div className="y_end-p1">{`방송 종료 `}</div>
      <div className="y_end-p2">{`결과를 확인해주세요 `}</div>
      <img className="y_end-gogo" alt="" src={`${photo}y_resultgo.svg`} 
       onClick={() => navigate(`/result2?roomName=${roomName}`)}/>
    </div>
  );
};

export default AuctionEnd;
