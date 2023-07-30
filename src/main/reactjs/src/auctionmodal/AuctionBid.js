import {useCallback, useRef, useState} from "react";
import "../css/auctionbid.css";
import axios from "axios";

const Component = ({ onClose, userName, productName, roomName }) => {
    const onRectangle2Click = useCallback(() => {
        // Please sync "경매방송페이지" to the project
    }, []);

    const [price, setPrice] = useState("");
    const [modalOpen, setModalOpen] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const formatPrice = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleInputChange = (e) => {
        e.preventDefault();

        const input = e.target.value.replace(/[^\d]/g, "");
        if (input === "") {
            setPrice("");
            return;
        }

        const formattedPrice = formatPrice(input);
        setPrice(formattedPrice);
    };

    const Handlebidbutton = async (e) => {
        if (isLoading) return;

        e.preventDefault();

        if (!productName) {
            alert("상품명이 존재하지 않습니다. 다시 시도해주세요.");
            return;
        }

        const getPriceWithoutComma = (priceWithComma) => {
            const priceWithoutComma = priceWithComma.replace(/[^\d]/g, "");
            return parseInt(priceWithoutComma);
        };

        const numericPrice = getPriceWithoutComma(price);

        if (isNaN(numericPrice) || numericPrice <= 0) {
            alert("올바른 입찰 금액을 입력해주세요.");
            return;
        }

        if (numericPrice % 100 !== 0) {
            alert("입찰금액은 100원 단위로 입력해주시기 바랍니다.");
            setPrice("");
            inputRef.current.focus();
            return;
        }

        try {
            setLoading(true);

            const confirmBid = window.confirm(
                "입찰은 한 번만 가능합니다. 정말 입찰하시겠습니까?"
            );
            if (confirmBid) {
                const bidDto = {
                    product_name: productName,
                    user_email: userName,
                    price: numericPrice,
                };
                const response = await axios.post("/product/price-compare", bidDto);

                if (response.data === "입찰이 성공적으로 완료되었습니다!") {
                    await axios.post("/bid/insert", bidDto);
                    alert("입찰이 완료되었습니다!");
                    setModalOpen(false);
                    onClose();
                    window.location.reload();
                } else {
                    alert(response.data);
                }
            }
        } catch (err) {
            alert("입찰 금액을 입력해주시기 바랍니다.");
            console.error("입찰 중 에러가 발생했습니다!", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="y_atbid-reddiv">
            <div className="y_atbid-div">
                <div className="y_atbid-p2">
                    *입찰금액은 100원 단위로 입력해주시기 바랍니다.
                </div>
                <div className="y_atbid-line" />
                <div className="y_atbid-p1">{productName}</div>
                <input
                    ref={inputRef}
                    className="y_atbid-input"
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0"
                    value={price}
                    onChange={handleInputChange}
                />
                <button className="y_bid-btn" onClick={Handlebidbutton}>
                    <p>입찰</p>
                </button>
            </div>
        </div>
    );
};

export default Component;
