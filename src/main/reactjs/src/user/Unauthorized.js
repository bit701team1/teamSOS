import React from 'react';
import Axios from "axios";

function Unauthorized(props) {
    const handleUnauthClick = () => {
        const url = "/user/rejection";

        Axios.get(url)
            .then(res => {
                alert("오");
            })
            .catch(error => {
                // 오류 처리
                console.error(error);
            });
    }

    return (
        <div>

            <h3 onClick={handleUnauthClick}>Spring에서 rejection를 호출합니다</h3>
        </div>
    );
}

export default Unauthorized;