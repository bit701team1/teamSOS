import React, {useEffect, useState} from "react";
import {Await, useNavigate} from "react-router-dom";
import axios from "axios";

function Payment() {

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
    const [userdata, setUserdata] = useState('');

    const navi = useNavigate();


    useEffect(() => {
        axios.get('/room/userdata')
            .then(response => {
                setUserdata(response.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });
    }, []);


    const { IMP } = window;

    IMP.init('imp57160077'); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.

    const handleClick = () => {
        /* 결제 요청 */
        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `merchant_${new Date().getTime()}`, // 가맹점에서 생성한 주문 번호
            name,
            amount,
            buyer_email,
            buyer_name,
            buyer_tel,
            buyer_addr,
            buyer_postcode,
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    }
    //#시도1
    // /* 3. 콜백 함수 정의하기 */
    // async function callback(response) {
    //     const {
    //         success,
    //         merchant_uid,
    //         imp_uid,
    //         error_msg
    //     } = response;
    //
    //     if (success) {
    //         alert(
    //             '결제 성공!!'
    //             + '\n이름:' + buyer_name
    //             + '\n금액:' + amount
    //             + '\n주문번호:' + merchant_uid
    //             +'uid:'+imp_uid
    //         );
    //     } else {
    //         alert(`결제 실패: ${error_msg}`);
    //     }
    //
    //     axios.post("/payment/insert", {
    //         id,
    //         pg,
    //         pay_method,
    //         merchant_uid,
    //         amount,
    //         name,
    //         buyer_name,
    //         buyer_tel,
    //         buyer_email,
    //         buyer_addr,
    //         buyer_postcode
    //     })
    //         .then(res => {
    //             navi("/");
    //         })
    //
    //     try {
    //         const getToken = await axios({
    //             url: "https://api.iamport.kr/users/getToken",
    //             method: "post", // POST method
    //             headers: {"Content-Type": "application/json"},
    //             data: {
    //                 imp_key: "5241476238764722", // REST API 키
    //                 imp_secret: "FEGg1bKjDnj1TcK2WUjr6VOs0FoJXKqHWc8lhjJ09aQw6h2ekW8mJ3z1OAoxPARo23WIE9YtQrraIiUG" // REST API Secret
    //             }
    //         });
    //         const {access_token} = getToken.data; // 인증 토큰
    //
    //         const getPaymentData = await axios({
    //             // imp_uid 전달
    //             url: `https://api.iamport.kr/payments/${imp_uid}`,
    //             // GET method
    //             method: "get",
    //             // 인증 토큰 Authorization header에 추가
    //             headers: {"Authorization": access_token}
    //         });
    //         const paymentData = getPaymentData.data; // 조회한 결제 정보
    //     } catch (e) {
    //         response.status(400).send(e)
    //     }
    //
    // };

    //## 채택 ##
    //#시도2=> 결제 성공까지는 나오고 그 후로 vaildationResult가 안댐 + insert가 실패 (id = null 로 저장됨)
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
            alert(
                '결제 성공!!'
                + '\n이름:' + buyer_name
                + '\n금액:' + amount
                + '\n주문번호:' + merchant_uid
                +'\n'+'uid:'+imp_uid
            );

            //paymentinfo로 넘어갈 데이터 imp_uid, amount
            const validationResult = await axios.post("/payment/paymentinfo", {
                pg:pg,
                pay_method:pay_method,
                imp_uid: imp_uid,
                amount: amount,
                merchant_uid,
                name,
                buyer_name,
                buyer_tel,
                buyer_email:userdata.email,
            });
            // if (validationResult.data) {
            // //     // 서버에서 결제 정보 일치하다고 판단한 경우 데이터베이스에 추가
            //     axios.post("/payment/insert", {
            //         id,
            //         pg:pg,
            //         pay_method:pay_method,
            //         merchant_uid,
            //         imp_uid,
            //         amount,
            //         name,
            //         buyer_name,
            //         buyer_tel,
            //         buyer_email,
            //         buyer_addr,
            //         buyer_postcode,
            //     })
            //         .then(() => {
            //             alert(`결제정보 인서트!!!`)
            //             navi("/"); // 결제 성공 후 메인 페이지로 이동
            //         })
            // } else {
            //     // 서버에서 결제 정보가 일치하지 않다고 판단한 경우 처리 (예: 알림 표시, 오류 처리 등)
            //     alert(`결제정보 불일치: ${error_msg}`)
            // }
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };

    //#시도 3
    // /* 3. 콜백 함수 정의하기 */
    // async function callback(response) {
    //     const {
    //         success,
    //         merchant_uid,
    //         imp_uid,
    //         error_msg
    //     } = response;
    //
    //     if (success) {
    //         alert(
    //             '결제 성공!!'
    //             + '\n이름:' + buyer_name
    //             + '\n금액:' + amount
    //             + '\n주문번호:' + merchant_uid
    //             +'\nuid:' + imp_uid
    //         );
    //     } else {
    //         alert(`결제 실패: ${error_msg}`);
    //     }
    //
    //     const paymentInfo = {
    //         imp_uid,
    //         merchant_uid,
    //         status: success ? "success" : "failed",
    //         paid_amount: parseInt(amount),
    //     }
    //
    //     try {
    //         await axios.post("/payment/paymentinfo", paymentInfo)
    //             .then(res => {
    //                 if (res.data) {
    //                     alert('결제 결과가 서버에 저장되었습니다.');
    //                     navi("/");
    //                 } else {
    //                     alert('결제 결과를 서버에 저장하는 데 실패했습니다.');
    //                 }
    //             })
    //     } catch (error) {
    //         console.error('Error during saving payment information:', error);
    //     }
    // };


    return (
        <div>
            <br/>
            <p>{userdata.email}</p>
            <input type="email" value={userdata.email} onChange={(e) => setBuyerEmail(userdata.email)} placeholder="Email" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="가격" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="상품명" />
            <input type="text" value={buyer_name} onChange={(e) => setBuyerName(e.target.value)} placeholder="이름" />
            <input type="tel" value={buyer_tel} onChange={(e) => setBuyerTel(e.target.value)} placeholder="전화번호" />
            <button onClick={handleClick}>결제</button>
        </div>
    );
}

export default Payment;
