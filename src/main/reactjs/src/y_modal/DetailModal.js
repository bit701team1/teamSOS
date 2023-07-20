import "../css/detailmodal.css";
const DetailModal = ({ onClose }) => {
    return (
        <div className="y_detail-div">
            <div className="y_detailed-information ">DETAILED INFORMATION</div>
            <div className="y_date-20230704">{`date : 2023.07.04 `}</div>
            <div className="y_detail-title ">{`title :  경철이와 데이트  `}</div>
            <div className="y_detail-container">
                <p className="y_detail-p">{`detail : 뉴진스 덕후 경철이와 데이트를 `}</p>
                <p className="y_detail-p">할 수 있는 기회 !!!!!!!</p>
            </div>
            <div className="y_artist">artist : 조경철</div>
            <img className="y_detail-icon " alt="" src="" />
        </div>
    );
};

export default DetailModal;
