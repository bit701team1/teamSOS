import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderCompleteMobile() {
    const [result, setResult] = useState('');

    const { imp_uid, merchant_uid, imp_success } = useParams();

    useEffect(() => {
        axios.get("/payment/getcompleteresult", {
            params: {
                imp_uid: imp_uid,
                merchant_uid: merchant_uid,
                imp_success: imp_success
            }
        })
            .then(response => {
                // 성공적으로 처리된 경우, response에 결제 정보가 담겨 있을 것입니다.
                console.log(response.data);
                // 이후 필요한 처리를 수행하시면 됩니다.
                setResult(response.data); // 결제 정보를 상태에 저장
            })
            .catch(error => {
                // 결제 실패 또는 오류가 발생한 경우
                console.error(error);
                // 에러 처리를 하시거나 필요한 작업을 수행하시면 됩니다.
            });
    }, [imp_uid, merchant_uid, imp_success]); // URL 파라미터가 변경될 때마다 useEffect를 실행합니다.

    return (
        <div>
            {result}
        </div>
    );
}

export default OrderCompleteMobile;
