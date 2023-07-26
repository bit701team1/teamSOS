import {useCallback, useState} from "react";
import "../css/auctionbid.css";
import axios from "axios";
const Component = ({ onClose, userName, productName, roomName }) => {
    const onRectangle2Click = useCallback(() => {
        // Please sync "경매방송페이지" to the project
    }, []);

    const [price, setPrice] = useState("");
    const [modalOpen, setModalOpen] = useState(true); // 모달 열림/닫힘 상태 추가
    const [isLoading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPrice(e.target.value);
    };

    const Handlebidbutton = async (e) => {
        if (isLoading) return; // 이미 요청 중이면 중복 클릭 방지

        e.preventDefault();
        try {
            setLoading(true); // 요청 시작 시 isLoading 상태 변경

            const confirmBid = window.confirm(
                "입찰은 한 번만 가능합니다. 정말 입찰하시겠습니까?"
            );
            if (confirmBid) {
                const response = await axios.post(
                    "/product/price-compare",
                    {
                        user_email: userName,
                        price: parseInt(price),
                        productName: productName,
                    },
                    {
                        params: {
                            productName: productName,
                        },
                    }
                );

                // BidDto 생성
                const bidDto = {
                    product_name: productName,
                    user_email: userName,
                    price: parseInt(price),
                };
                // console.log("bidDto>>"+JSON.stringify(bidDto))

                // BidService.insertBid 호출하여 DB에 입찰 값 저장
                await axios.post("/bid/insert", bidDto);

                alert("입찰이 완료되었습니다!");

                // 모달 닫기
                setModalOpen(false);
                onClose();
                window.location.reload();
            }
        } catch (err) {
            alert("입찰 금액을 입력해주시기 바랍니다.");
            console.error("입찰 중 에러가 발생했습니다!", err);
        } finally {
            setLoading(false); // 요청 완료 시 isLoading 상태 변경
        }
    };

    return (
        <div className="y_atbid-div">
            <div className="y_atbid-line" />
            <div className="y_atbid-p1">"{userName}" "{productName}</div>
            <input className="y_atbid-input"
                   type="number"
                   min="0"
                   step="100"
                   pattern="[0-9]*"
                   onChange={handleInputChange}/>
            <button className="y_bid-btn" onClick={Handlebidbutton}><p>입찰</p></button>
        </div>
    );
};

export default Component;