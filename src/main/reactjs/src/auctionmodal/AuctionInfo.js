import "../css/auctioninfo_modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHeart} from "@fortawesome/free-solid-svg-icons";
const Component1 = ({ onClose }) => {
  return (
    <div className="y_auctioninfo-div">
       <div className="y_atinfo-floor">Floor</div>
      <div className="y_atinfo-amount">Amount</div>
      <div className="y_atinfo-waiting">Waiting</div>
      <div className="y_atinfo-likes">Likes</div>
      <div className="y_atinfo-1">39,800</div>
      <div className="y_atinfo-2">104</div>
      <div className="y_atinfo-3">27</div>
      <div className="y_atinfo-4">1</div>
      <div className="y_atinfo-heart">
      <i className="bi bi-suit-heart-fill" style={{color:'#fe7171'}}></i>
      </div>
      <i className="y_atif-p1">김성학의 오마카세</i>
      <div className="y_atif-line" />
      <i className="y_atif-p2">상품 설명</i>
      <div className="y_atif-div">
        <span className="y_atif-p3">세진 없는 세진팀 팀장 김성학 개발자와 함께하는
        식사 상품으로 김성학 개발자가 취미로 하던 요리를 직접
        맛 볼 수 있는 좋은 기회!!! 함께 장보기 데이트는 물론 같이
        식사를 하며 오붓한 시간을 보낼 수 있는 좋은 시간이 되
        길바랍니다.</span>
      </div>
    </div>
  );
};

export default Component1;
