import React from 'react';
import "../css/paymentResult.css";
import {useLocation} from "react-router-dom";

function PaymentResult(props) {
    // useLocation 훅을 사용하여 전달받은 데이터를 받아옵니다.
    const location = useLocation();
    const { state } = location;

    // 결제 성공 시 sessionStorage에 저장한 데이터를 가져옵니다.
    const paymentData = JSON.parse(sessionStorage.getItem('paymentData'));

    return (
        <div className="D_payment_page">
            <div className="D_paymentResult">
                <h1 className="D_title">결제 성공!</h1>
                <div className="D_payment_container">
                    <div className="D_payment_item">
                        <label>상품명</label>
                        <span>{paymentData.productName}</span>
                    </div>
                    <div className="D_payment_item">
                        <label>거래번호</label>
                        <span>{paymentData.merchant_uid}</span>
                    </div>
                    <div className="D_payment_item">
                        <label>구매자명</label>
                        <span>{paymentData.user_name}</span>
                    </div>
                    <div className="D_payment_item">
                        <label>결제금액</label>
                        <span>{paymentData.amount}원</span>
                    </div>
                </div>
                <a href="/" className="D_button">결제 확인</a>
            </div>
        </div>
    );
}

export default PaymentResult;