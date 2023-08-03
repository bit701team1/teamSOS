import React, { useCallback, useState, useEffect } from 'react';
import ResultModal from "../resultmodal/ResultModal";
import PortalPopup from "../resultmodal/PortalPopup";
import "../css/resultpage2.css";
import axios from "axios";
import {useLocation,useNavigate} from "react-router-dom";
function ResultPage2(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = () => {
            // 홈으로 이동
            navigate("/main");
        };

        // 브라우저 뒤로가기 이벤트 리스너 등록
        window.addEventListener("popstate", handlePopState);

        return () => {
            // 컴포넌트가 언마운트되면 이벤트 리스너 제거
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);
   
    const [isFrameOpen, setFrameOpen] = useState(false);
    //동호 추가
    //결제 기능 추가
    const [pg] = useState("html5_inicis");
    const [pay_method] = useState("card");
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [buyer_name, setBuyerName] = useState("");
    const [buyer_tel, setBuyerTel] = useState("");
    const [buyer_email, setBuyerEmail] = useState("");
    const [buyer_addr, setBuyerAddr] = useState("");
    const [buyer_postcode, setBuyerPostcode] = useState("");
    const [imp_uid, setImp_uid] = useState("");
    const [m_redirect_url, setM_redirect_url] =useState("");
    const navi = useNavigate();
    const { IMP } = window;
    IMP.init('imp57160077'); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.

    const paymentClick = () => {
        /* 결제 요청 */
        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `merchant_${new Date().getTime()}`, // 가맹점에서 생성한 주문 번호
            name:roomName,
            amount:userBid.price,
            buyer_email:user_email,
            buyer_name:user_name,
            buyer_tel:userdata.hp,
            m_redirect_url:'http://175.45.193.12/ordercompletemobile',
        };
        console.log("imp_uid>"+imp_uid);
        // 결제 요청 시 데이터를 sessionStorage에 저장
        sessionStorage.setItem('paymentData', JSON.stringify({
            data
        }));

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    }
    /* 3. 콜백 함수 정의하기 */
    async function callback(response) {
        const {
            success,
            merchant_uid,
            imp_uid,
            error_msg
        } = response;
        if (success) {
            setImp_uid(imp_uid);

            // // 결제 완료 시 데이터를 sessionStorage에 저장
            // sessionStorage.setItem('paymentData', JSON.stringify({
            //     productName: roomName,
            //     amount: userBid.price,
            //     merchant_uid,
            //     user_name,
            //     user_email,
            // }));


            //paymentinfo로 넘어갈 데이터 imp_uid, amount
            const validationResult = await axios.post("/payment/paymentinfo", {
                pg:pg,
                pay_method:pay_method,
                imp_uid: imp_uid,
                amount: userBid.price,
                merchant_uid,
                name:roomName,
                buyer_name:user_name,
                buyer_tel:userdata.hp,
                buyer_email:user_email,
            });
            navi('/paymentresult');
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };

    //여기까지 결제 필요
    const [userBid, setUserBid] = useState(null); // 사용자의 입찰 정보를 담을 상태 추가
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomName = searchParams.get('roomName');
    const [userdata, setUserdata] = useState('');
    const [userDataLoaded, setUserDataLoaded] = useState(false); // 사용자 데이터 로딩 상태 추가
    const [highestPriceBid, setHighestPriceBid] = useState(null); // highestPriceBid 상태 추가
    const [bidsCount, setBidsCount] = useState(0); // 경매에 해당하는 입찰 수 상태 추가
    const user_email=userdata.email;
    const user_name = userdata.user_name;

    //정보
    useEffect(() => {
        // 사용자 데이터 가져오기
        axios.get('/room/userdata')
            .then(response => {
                setUserdata(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });

        // 최고 입찰 금액 가져오기
        axios.get('/bid/highestprice', {
            params: {
                productName: roomName
            }
        })
            .then(response => {
                setHighestPriceBid(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });

        // 사용자의 입찰 정보 가져오기
        axios.get('/bid/userbid', {
            params: {
                productName: roomName,
                userEmail: user_email
            }
        })
            .then(response => {
                setUserBid(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });

        // 경매에 해당하는 입찰 수 가져오기
        axios.get('/bid/countbids', {
            params: {
                productName: roomName
            }
        })
            .then(response => {
                setBidsCount(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });
    }, [roomName, userdata.email]);

    const formatPrice = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //여기까지
    const onIconArrowRightCircledClick = useCallback(() => {
      // Please sync "경매방송페이지" to the project
    }, []);

    const openFrame = useCallback(() => {
      setFrameOpen(true);
    }, []);

    const closeFrame = useCallback(() => {
      setFrameOpen(false);
    }, []);

    const photo = process.env.REACT_APP_SUICONURL;
    // 결제하기 버튼 렌더링 여부를 결정하는 함수
    const shouldRenderPaymentButton = () => {
        if (userBid && highestPriceBid) {
            return userBid.user_email === highestPriceBid.user_email;
        }
        return false;
    };
    const handleGoBack = () => {
        navigate("/main"); // -1을 전달하여 뒤로가기 기능을 수행합니다.
      };
    return (
      <>
        <div className="y_resultpage-div">
        
          <img className="y_result-img" alt="" src={`${photo}ohmakase.jpeg`}/>
          <img
            alt="" src={`${photo}y_back.svg`}
            className="y_result-back"
            onClick={handleGoBack}
          />
          <div className="y_result-dark" />
          <div className="y_result-div2" />
          <div className="y_result-p1">경매 결과를 확인 하세요</div>
          <div className="y_result-div3" />
          {/*<div className="y_result-p2">{highestPriceBid?.price+'원' || '없음'}</div>*/}
            <div className="y_result-p2">{highestPriceBid ? formatPrice(highestPriceBid.price) + '원' : '없음'}</div>
          <div className="y_result-p3">경매 입찰</div>
          <div className="y_result-p4">{roomName}</div>
          <div className="y_result-p5">{user_name}</div>
          {/*<div className="y_result-p6">{`${userBid?.price+'원' || '없음'}`}</div>*/}
            <div className="y_result-p6">{userBid ? formatPrice(userBid.price) + '원' : '없음'}</div>
          <div className="y_result-p7">
              {user_email}</div>
          <div className="y_result-p8">경매 결과</div>
          <div className="y_result-p9">{roomName}</div>
          <div className="y_result-graph-div" onClick={openFrame}>
            <button className="y_result-graph-btn">낙찰 그래프</button>
          </div>
          <div className="y_result-p11">상품명</div>
          <div className="y_result-p12">아이디</div>
          <div className="y_result-p13">구매자</div>
          <div className="y_result-p14">{`당신의 입찰 가격 `}</div>
          <div className="y_result-p15">최종 낙찰 금액</div>
          <div className="y_result-box" />
          <div className="y_result-p16">{bidsCount}명</div>
            {shouldRenderPaymentButton() && (
                <button className="y_result-success" onClick={paymentClick}>
                    결제 하기
                </button>
            )}
        </div>
        {isFrameOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeFrame}
          >
            <ResultModal onClose={closeFrame} productName={roomName}/>
          </PortalPopup>
        )}
      </>
    );
  };

export default ResultPage2;