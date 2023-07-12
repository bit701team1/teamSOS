import "../css/Component.css";
const Component = ({ onClose }) => {
    return (
        <div className="div3">
            <div className="detailed-information">DETAILED INFORMATION</div>
            <div className="date-20230704">{`date : 2023.07.04 `}</div>
            <div className="title">{`title :  경철이와 데이트  `}</div>
            <div className="detail-container">
                <p className="detail">{`detail : 뉴진스 덕후 경철이와 데이트를 `}</p>
                <p className="detail">할 수 있는 기회 !!!!!!!</p>
            </div>
            <div className="artist">artist : 조경철</div>
            <img className="icon" alt="" src="" />
        </div>
    );
};

export default Component;
