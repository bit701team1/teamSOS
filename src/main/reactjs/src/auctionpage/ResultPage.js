import React, {PureComponent,useEffect, useState} from 'react';
import '../css/resultpage.css';
import cel from'../image/cel.gif';
import { useLocation } from "react-router-dom";//추가
import axios from 'axios';
import { BarChart, Bar,
    Cell, XAxis,
    YAxis, CartesianGrid,
    Tooltip, Legend,
    ResponsiveContainer } from 'recharts';
import Payment from "./Payment";


function ResultPage(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomName = searchParams.get('roomName');

    const [data, setData] = useState([]);
    useEffect(() => {
        // 서버로부터 데이터 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await axios.get(`/bid/bidresult?productName=${roomName}`);
                const fetchedData = response.data;
                const sortedData = fetchedData.sort((a, b) => b.price - a.price); // 금액 순으로 내림차순 정렬
                const formattedData = sortedData.map((item, index) => {
                    if (index === 2) { // index가 2일 경우 꼴지로 설정
                        return {
                            name: "꼴지",
                            num: item.price
                        };
                    }
                    return {
                        name: `${index + 1}등`,
                        num: item.price
                    };
                });
                setData(formattedData);
                console.log("roomname!" + roomName);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [roomName]);

    window.onload = function() {
        var imageContainer = document.getElementById("y_celimg");
        setTimeout(function() {
            imageContainer.style.display = "none";
        }, 10*1000);
    };
    // const data = [
    //     {
    //         name: "1등",
    //         num: 3000000
    //     },
    //     {
    //         name: "2등",
    //         num: 2000000
    //     },
    //     {
    //         name: "꼴등",
    //         num: 100000
    //     },
    // ];

    return (
        <div className="y_result">
            <div className="y_result-img">
                <img alt="" src={cel}  id="y_celimg" />
            </div>
            <div className="y_result-div"/>
            <div className="y_aa-arte-container">
                <p className="y_aa">
                    <span>{`    `}</span>
                    <span className="y_span">{` `}</span>
                    <span className="y_aa1">{`A&A`}</span>
                </p>
                <p className="y_arte-arena"> ARTE : ARENA</p>
            </div>
            <div className="y_resulttext">낙찰되었습니다!!!</div>
            <div className="y_chart" >
                <BarChart width={900} height={750} data={data} margin={{ left: 80}}>
                    <Bar dataKey="num" fill="#8C0410" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
            </div>
            <div className="y_result-success"><Payment/></div>
            <div className="y_header" />
            roomName: {roomName}
        </div>
    );
};

export default ResultPage;