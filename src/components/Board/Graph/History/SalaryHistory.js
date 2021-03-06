import React, { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CustomDot from "./CustomDot";
import CustomTick from "./CustomTick";
import styled from "styled-components";

const Current = styled.h5`
  width: 80%;
  margin-top: -3%;
  margin-left: 10%;
  text-shadow: 1px 2px 1px #cecece;
  color: #000;
  padding: 1% 0;
  text-align: center;
`;

const Tip = styled.span`
  position: absolute;
  top: 50%;
  color: #4caf50;
  font-size: 10px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const SalaryHistory = (props) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { data } = props;
  const dateObj = new Set();

  const historyData = data.map((obj, idx) => {
    const slicedDate = obj.from_date.slice(0, 7);
    const salary = obj.salary;
    dateObj[idx] = slicedDate;
    return { date: slicedDate, salary: salary };
  });

  const onDotActive = useCallback(
    (index) => {
      setActiveIdx(index);
    },
    [setActiveIdx]
  );

  const salaryHistory = historyData ? (
    <>
      <Current>{`현재 연봉 : ${data[data.length - 1].salary}`}</Current>
      <Tip>Tip) 마우스를 올려보세요 </Tip>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={historyData} margin={{ right: 40, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
            tick={<CustomTick />}
            ticks={[`${dateObj[0]}`, `${dateObj[data.length - 1]}`]}
            tickLine={false}
          />

          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="salary"
            stroke="#4caf50"
            dot={<CustomDot onDotActive={onDotActive} activeIdx={activeIdx} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : null;

  return salaryHistory;
};

export default SalaryHistory;
