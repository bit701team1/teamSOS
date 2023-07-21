import React, { useCallback, useState } from 'react';
import ResultModal from "../resultmodal/ResultModal";
import PortalPopup from "../resultmodal/PortalPopup";
import img from '../image/스폰지밥1.gif';
import back from '../image/y_back.svg';
import "../css/resultpage2.css";
function ResultPage2(props) {
    const [isFrameOpen, setFrameOpen] = useState(false);

    const onIconArrowRightCircledClick = useCallback(() => {
      // Please sync "경매방송페이지" to the project
    }, []);
  
    const openFrame = useCallback(() => {
      setFrameOpen(true);
    }, []);
  
    const closeFrame = useCallback(() => {
      setFrameOpen(false);
    }, []);
  
    return (
      <>
        <div className="y_resultpage-div">
            
          <img className="y_result-img" alt="" src={img}/>
          <img
            alt="" src={back}
            className="y_result-back"
            onClick={onIconArrowRightCircledClick}
          />
          <div className="y_result-dark" />
          <div className="y_result-div2" />
          <div className="y_result-p1">경매 결과를 확인 하세요</div>
          <div className="y_result-div3" />
          <div className="y_result-p2">1,000,000</div>
          <div className="y_result-p3">경매 입찰</div>
          <div className="y_result-p4">김성학의 오마카세</div>
          <div className="y_result-p5">KDK</div>
          <div className="y_result-p6">1,000,000</div>
          <div className="y_result-p7">
            sudus1961@gmail.com</div>
          <div className="y_result-p8">경매 결과</div>
          <div className="y_result-p9">김성학의 오마카세</div>
          <div className="y_result-graph-div" onClick={openFrame}>
            <button className="y_result-graph-btn">낙찰 그래프</button>
          </div>
          <div className="y_result-p11">상품명</div>
          <div className="y_result-p12">아이디</div>
          <div className="y_result-p13">구매자</div>
          <div className="y_result-p14">{`당신의 입찰 가격 `}</div>
          <div className="y_result-p15">최종 낙찰 금액</div>
          <div className="y_result-box" />
          <div className="y_result-p16">12명</div>
          <button className="y_result-success">결제 하기</button>
        </div>
        {isFrameOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeFrame}
          >
            <ResultModal onClose={closeFrame} />
          </PortalPopup>
        )}
      </>
    );
  };

export default ResultPage2;