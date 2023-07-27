import React, {useEffect} from 'react';
import axios from "axios";

function OrderCompleteMobile(props) {
    useEffect(() => {
        // URL 파라미터로 전달받은 값을 가져옵니다.
        const { imp_uid, merchant_uid, imp_success } = props.match.params;

        axios.get("/payment/getcompleteresult", {
            imp_uid: imp_uid,
            merchant_uid: merchant_uid,
            imp_success: imp_success
        })
            .then(response => {
                // 성공적으로 처리된 경우, response에 결제 정보가 담겨 있을 것입니다.
                console.log(response.data);
                // 이후 필요한 처리를 수행하시면 됩니다.
            })
            .catch(error => {
                // 결제 실패 또는 오류가 발생한 경우
                console.error(error);
                // 에러 처리를 하시거나 필요한 작업을 수행하시면 됩니다.
            });
    }, [props.match.params]); // URL 파라미터가 변경될 때마다 useEffect를 실행합니다.

    return (
        <div>

        </div>
    );
}

export default OrderCompleteMobile;