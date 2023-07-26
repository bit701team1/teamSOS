import "../css/auctionend.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuctionEnd = ({ onClose, roomName, roomId }) => {
  const navigate = useNavigate();
  const photo = process.env.REACT_APP_SUICONURL;
  const deleteroom =()=>{
    const url = `/room/deleteroom/${roomId}`;
    axios.post(url)
    .then(response => {
      alert("결과");
      navigate(`/result2?roomName=${roomName}`)
      console.log('roomId:'+roomId);
  })
  .catch(error => {
      alert("실패");
  });
};
  return (
    <div className="y_end-div">
      <div className="y_end-p1">{`방송 종료 `}</div>
      <div className="y_end-p2">{`결과를 확인해주세요 `}</div>
      <img className="y_end-gogo" alt="" src={`${photo}y_resultgo.svg`} 
       onClick={deleteroom}/>
    </div>
  );
};

export default AuctionEnd;
