import "../css/bidmodal.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BidModal = ({ onClose }) => {
    const [userdata, setUserdata] = useState("");
    const [price, setPrice] = useState("");
    const [modalOpen, setModalOpen] = useState(true); // 모달 열림/닫힘 상태 추가
    const [bidMessage, setBidMessage] = useState("");

    useEffect(() => {
        axios.get("/room/userdata")
            .then((response) => {
                console.log("user>>"+JSON.stringify(response));
                setUserdata(response.data);
            })
            .catch((error) => {
                console.error("에러가 발생했습니다!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        setPrice(e.target.value);
    };

    const bidHandler = async (e) => {
        e.preventDefault();
        try {
            const confirmBid = window.confirm(
                "입찰은 한 번만 가능합니다. 정말 입찰하시겠습니까?"
            );
            if (confirmBid) {
                const response = await axios.post(
                    "/product/price-compare",
                    {
                        user_email: userdata.email,
                        price: parseInt(price),
                        productName: "상품2",
                    },
                    {
                        params: {
                            productName: "상품2",
                        },
                    }
                );

                // BidDto 생성
                const bidDto = {
                    product_name: "상품2",
                    user_email: userdata.email,
                    price: parseInt(price),
                };
                // console.log("bidDto>>"+JSON.stringify(bidDto))

                // BidService.insertBid 호출하여 DB에 입찰 값 저장
                await axios.post("/bid/insert",
                    bidDto);

                alert("입찰이 완료되었습니다!")

                // 모달 닫기
                setModalOpen(false);
                onClose();
                window.location.reload();
            }
        } catch (err) {
            alert("입찰 금액을 입력해주시기 바랍니다.");
            console.error("입찰 중 에러가 발생했습니다!", err);
        }
    };

    return (
        <div className={`y_bid-div  ${modalOpen ? "open" : "closed"}`}>
            <div className="y_please-make-a">Please make a bid</div>
            <div className="y_price">price</div>
            <div className="y_bid-child">
                <input
                    width="60%"
                    type="number"
                    min="0"
                    step="100"
                    pattern="[0-9]*"
                    onChange={handleInputChange}
                />
            </div>
            <div className="y_item">
                <button className="bidding" onClick={bidHandler}>
                    Bidding
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default BidModal;
