import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function OrderCompleteMobile() {
    const [result, setResult] = useState(null); // 결제 결과를 저장할 상태값, 초기값은 null
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));
    const imp_uid = queryParams.get('imp_uid');
    const merchant_uid = queryParams.get('merchant_uid');
    const imp_success = queryParams.get('imp_success');

    useEffect(() => {
        axios
            .get('/payment/getcompleteresult', {
                params: {
                    imp_uid: imp_uid,
                    merchant_uid: merchant_uid,
                    imp_success: imp_success,
                    paymentData: JSON.stringify(paymentData)
                },
            })
            .then((response) => {
                // 성공적으로 처리된 경우, response에 결제 정보가 담겨 있을 것입니다.
                console.log(response.data);
                // 이후 필요한 처리를 수행하시면 됩니다.
                setResult(response.data); // 결제 정보를 상태에 저장
            })
            .catch((error) => {
                // 결제 실패 또는 오류가 발생한 경우
                console.error(error);
                // 에러 처리를 하시거나 필요한 작업을 수행하시면 됩니다.
            });
    }, []); // useEffect를 한 번만 실행하도록 빈 배열을 전달

    // 결제가 성공했을 때 결과창을 표시
    if (result === true) {
        return <div>결제가 성공적으로 완료되었습니다!</div>;
    } else if (result === false) {
        // 결제가 실패했을 때 결과창을 표시
        return <div>결제가 실패하였습니다. 다시 시도해주세요.</div>;
    } else {
        // 아직 결제 결과가 도착하지 않았을 때 로딩 상태를 표시
        return <div>결제 결과 확인 중...</div>;
    }
}

export default OrderCompleteMobile;
