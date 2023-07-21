import { useCallback } from "react";
import "../css/auctionbid.css";
const Component = ({ onClose }) => {
  const onRectangle2Click = useCallback(() => {
    // Please sync "경매방송페이지" to the project
  }, []);

  return (
    <div className="y_atbid-div">
      <div className="y_atbid-line" />
      <div className="y_atbid-p1">Please make a bid</div>
      <input className="y_atbid-input" />
      <button className="y_bid-btn" ><p>완료</p></button>
    </div>
  );
};

export default Component;
