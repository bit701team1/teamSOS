import "../css/resultmodal2.css";
import React, {PureComponent, useState} from 'react';
import { BarChart, Bar,
  Cell, XAxis,
  YAxis, CartesianGrid,
  Tooltip, Legend,
  ResponsiveContainer } from 'recharts';
const Component = ({ onClose }) => {

  const data = [
    {
        name: "1등",
        num: 3000000
    },
    {
        name: "2등",
        num: 2000000
    },
    {
        name: "꼴등",
        num: 100000
    },
];
  return (
    <div className="y_resultmodal-div">
    <div className="y_result-graph" >
    <BarChart width={350} height={350} data={data} margin={{left:10}}>
                    <Bar dataKey="num" fill="#b24c4b" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
      </div>
  </div>
  );
};

export default Component;
