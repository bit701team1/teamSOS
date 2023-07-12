
import React from 'react';
import "../css/FrameComponent.css";
import go from "../image/y_go.png";
import {useNavigate} from "react-router-dom";
const FrameComponent = ({ onClose }) => {
    const navigate = useNavigate()
    ;
    return (
        <div className="y_end-div">
            <div className="y_end1">방송이 끝났습니다!</div>
            <div className="y_end2">결과를 확인해주세요</div>
            <div className="y_end3">{`확인하러가기 `}</div>
            <img
                className="y_gogo"
                alt=""
                src={go}
                onClick={() => navigate('/result')}
            />
        </div>
    );
};

export default FrameComponent;
