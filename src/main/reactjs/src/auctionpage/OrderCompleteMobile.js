import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

function OrderCompleteMobile() {
    const [result, setResult] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imp_uid = queryParams.get('imp_uid');
    const merchant_uid = queryParams.get('merchant_uid');
    const imp_success = queryParams.get('imp_success');
    const navi = useNavigate();
    // paymentData를 세션에서 읽어옴
    const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));
    // const { imp_uid, merchant_uid, imp_success } = queryParams;

    // useEffect(() => {
    //     axios
    //         .get('/payment/getcompleteresult', {
    //             params: {
    //                 imp_uid: imp_uid,
    //                 merchant_uid: merchant_uid,
    //                 imp_success: imp_success
    //             },
    //         })
    //         .then((thenresponse) => {
    //             const response = thenresponse.data.response;
    //             // 성공적으로 처리된 경우, response에 결제 정보가 담겨 있을 것입니다.
    //             console.log("amount>"+response.data.response.amount);
    //             console.log("merchant_uid>"+response.data.response.merchant_uid);
    //
    //             // const { amount, merchant_uid } = response.data;
    //             const amount = Number(thenresponse.data.response.amount);
    //             const merchant_uid = thenresponse.data.response.merchant_uid;
    //             const imp_uid = thenresponse.data.response.imp_uid;
    //
    //             const paymentDataStr = sessionStorage.getItem('paymentData');
    //             const paymentData = JSON.parse(paymentDataStr);
    //             const requestAmount = Number(paymentData.data.amount);
    //             const requestMerchant_uid = paymentData.data.merchant_uid;
    //
    //             //결제정보 비교
    //             if (amount === requestAmount && merchant_uid === requestMerchant_uid) {
    //                 axios
    //                     .post('/payment/insert', paymentData.data, {
    //                         params: {
    //                             imp_uid: imp_uid,
    //                         },
    //                     })
    //                     .then((insertresponse) => {
    //                         console.log('결제 정보가 데이터베이스에 저장되었습니다.');
    //                         console.log(insertresponse.data);
    //                         console.log("amount>"+insertresponse.data.response.amount+"&requestAmount>"+requestAmount);
    //                         console.log("merchant_uid>"+insertresponse.data.response.merchant_uid+"&requestMerchant_uid>"+requestMerchant_uid);
    //                         setResult(true); // 결제가 성공한 경우 result 값을 true로 설정
    //                     })
    //                     .catch((error) => {
    //                         console.error('결제 정보를 데이터베이스에 저장하는데 실패했습니다.'+"error>"+error);
    //                         setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
    //                     });
    //             } else {
    //                 // 결제 정보가 일치하지 않는 경우
    //                 console.log('결제 정보가 맞지 않습니다.');
    //                 console.log("amount>"+thenresponse.data.response.amount);
    //                 console.log("merchant_uid>"+thenresponse.data.response.merchant_uid);
    //                 console.log("amount>"+thenresponse.data.response.amount+"&requestAmount>"+requestAmount);
    //                 console.log("merchant_uid>"+thenresponse.data.response.merchant_uid+"&requsetImpUid>"+requestMerchant_uid);
    //                 setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
    //             }
    //         })
    //         .catch((error) => {
    //             // 결제 실패 또는 오류가 발생한 경우
    //             console.error(error);
    //             setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
    //         });
    // }, []);
    useEffect(() => {
        axios
            .get('/payment/getcompleteresult', {
                params: {
                    imp_uid: imp_uid,
                    merchant_uid: merchant_uid,
                    imp_success: imp_success
                },
            })
            .then((thenresponse) => {
                const response = thenresponse.data.response; // 객체 정의

                console.log(response); // 추가
                // 성공적으로 처리된 경우, response에 결제 정보가 담겨 있을 것입니다.
                console.log("amount>" + response.amount);
                console.log("merchant_uid>" + response.merchant_uid);

                const amount = Number(response.amount);
                const merchant_uid = response.merchant_uid;
                const imp_uid = response.imp_uid;

                const paymentDataStr = sessionStorage.getItem('paymentData');
                const paymentData = JSON.parse(paymentDataStr);
                const requestAmount = Number(paymentData.data.amount);
                const requestMerchant_uid = paymentData.data.merchant_uid;

                //결제정보 비교
                if (amount === requestAmount && merchant_uid === requestMerchant_uid) {
                    axios
                        .post('/payment/insert', paymentData.data, {
                            params: {
                                imp_uid: imp_uid,
                            },
                        })
                        .then((insertresponse) => {
                            console.log('결제 정보가 데이터베이스에 저장되었습니다.');
                            console.log(insertresponse.data);
                            console.log("amount>" + insertresponse.data.response.amount + "&requestAmount>" + requestAmount);
                            console.log("merchant_uid>" + insertresponse.data.response.merchant_uid + "&requestMerchant_uid>" + requestMerchant_uid);
                            setResult(true); // 결제가 성공한 경우 result 값을 true로 설정
                        })
                        .catch((error) => {
                            console.error('결제 정보를 데이터베이스에 저장하는데 실패했습니다.' + "error>" + error);
                            setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
                        });
                } else {
                    // 결제 정보가 일치하지 않는 경우
                    console.log('결제 정보가 맞지 않습니다.');
                    console.log("amount>" + response.amount);
                    console.log("merchant_uid>" + response.merchant_uid);
                    console.log("amount>" + response.amount + "&requestAmount>" + requestAmount);
                    console.log("merchant_uid>" + response.merchant_uid + "&requsetImpUid>" + requestMerchant_uid);
                    setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
                }
            })
            .catch((error) => {
                // 결제 실패 또는 오류가 발생한 경우
                console.error(error);
                setResult(false); // 결제가 실패한 경우 result 값을 false로 설정
            });
    }, []);

    // result 값에 따라서 결과창을 표시합니다.
    if (result === true) {
        return <div>결제가 성공적으로 완료되었습니다!</div>;
    } else if (result === false) {
        return <div>결제가 실패하였습니다. 다시 시도해주세요.</div>;
    } else {
        return <div>결제 결과 확인 중...</div>;
    }
}

export default OrderCompleteMobile;
