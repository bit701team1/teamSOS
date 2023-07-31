import "../css/auctionend.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuctionEnd = ({ onClose, roomName, roomId }) => {
  const navigate = useNavigate();
  const photo = process.env.REACT_APP_SUICONURL;
  const handleDeleteRoom = () => {
    // 해당 방 삭제 API 호출
    const url = `/room/deleteroom/${roomId}`;
    axios.post(url)
      .then(response => {
        // 삭제 성공 시 결과 페이지로 이동
        console.log('roomId:' + roomId);
        navigate(`/result2?roomName=${roomName}`);
      })
      .catch(error => {
        console.error(error); // 오류를 콘솔에 출력하여 디버깅에 도움
      });
  };

  return (
    <div className="y_end-div">
      <div className="y_end-p1">{`방송 종료 `}</div>
      <div className="y_end-p2">{`결과를 확인해주세요 `}</div>
      <img
        className="y_end-gogo"
        alt=""
        src={`${photo}y_resultgo.svg`}
        onClick={
          handleDeleteRoom // 이미지 클릭 시 결과 페이지로 이동
        }
      />
    </div>
  );
};
export default AuctionEnd;