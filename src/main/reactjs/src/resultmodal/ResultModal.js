import axios from "axios";
import "../css/resultmodal2.css";
import React, { PureComponent, useEffect, useState } from 'react';
import {
  Bar, XAxis,
  LabelList,
  ComposedChart
} from 'recharts';

/*순위 출력*/
const ResultModal = ({ onClose, productName }) => {
  const [data, setData] = useState([]);
  const randomizeData = () => {
    setData([
      { name: "최고가", price: Math.floor(Math.random() * 1000000) },
      { name: "2순위", price: Math.floor(Math.random() * 1000000) },
      { name: "최저가", price: Math.floor(Math.random() * 1000000) }
    ]);
  }

  useEffect(() => {
    const interval = setInterval(randomizeData, 500);
    axios.get(`/bid/bidresult?productName=${productName}`)
      .then(response => {
        setTimeout(() => {
          clearInterval(interval);
          const bids = response.data;
          const maxBid = Math.max(...bids.map(bid => bid.price));
          const minBid = Math.min(...bids.map(bid => bid.price));
          const secondMaxBid = Math.max(...bids.map(bid => bid.price !== maxBid ? bid.price : -Infinity));
          const newData = [
            { name: "최고가", price: maxBid },
            { name: "2순위", price: secondMaxBid },
            { name: "최저가", price: minBid }
          ];
          setData(newData);
        }, 2000);
      });
  }, [productName]);

  return (
    <div className="y_resultmodal-div">
      <div className="y_result-graph" >
        <ComposedChart width={350} height={350} data={data} margin={{ left: 10 }}>
          <XAxis dataKey="name" />
          <Bar dataKey="price" fill="#b24c4b" animationEasing="ease-in-out">
            <LabelList dataKey="price" position="top" />
          </Bar>
          {/* <Line type="monotone" dataKey="price" stroke="#ff7300"/> */}
        </ComposedChart>
      </div>
    </div>

  );
};


export default ResultModal;