import React, { useState, useCallback, memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis } from "recharts";
import { Grid } from "@material-ui/core";
import DeptBarSlider from "./DeptBarSlider";
import { setChartColor } from "../../../../shared/utility";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  deptSlider: {
    position: "absolute",
    top: "25%",
  },
}));

const Tick = styled.span`
  font-size: ${(props) => (props.value.length > 8 ? "12px" : "14px")};
  margin: 0 20px;
  padding: ${(props) => (props.value.length <= 8 ? "0 25px" : "0 10px")};
  position: absolute;
  text-align: center;
`;

const CustomizedTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;

  console.log("tickProps", tickProps);

  return (
    <foreignObject x={x - 70} y={y} width="140" height="50">
      <Tick xmlns="http://www.w3.org/1999/xhtml" value={value}>
        {value}
      </Tick>
    </foreignObject>
  );
};

const DeptBar = () => {
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(0);
  const [salary, setSalary] = useState(40000);

  const category = useSelector(
    (state) => state.searchBar.category,
    shallowEqual
  );
  const deptData = useSelector(
    (state) => state.statPage.deptData,
    shallowEqual
  );

  const deptSlice = category ? category.dept.slice(1) : null;

  const onChangeSlider = useCallback(
    (e, sal) => {
      setSalary(sal);
    },
    [setSalary]
  );

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const makeDeptBar = () => {
    console.log("deptData", deptData);
    console.log("salary", salary);
    const data = deptData[salary];

    const arrangedData = Object.keys(data).map((dept, idx) => {
      return { name: dept, cnt: data[dept] };
    });

    const activeItem = arrangedData[activeIndex];

    return (
      <Grid item>
        <p>데이터 보기 : Bar 클릭</p>
        <p className="content">{`"${activeItem.name}"의 $${salary}연봉자 수 : ${activeItem.cnt}명`}</p>
        <BarChart
          width={900}
          height={380}
          data={arrangedData}
          margin={{ top: 5, right: 5, bottom: 30, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            fill="#666"
            tick={<CustomizedTick />}
            tickLine={false}
          />
          <YAxis dataKey="cnt" />
          <Bar dataKey="cnt" onClick={handleClick}>
            {deptSlice.map((entry, index) => {
              const color = setChartColor(entry);
              const stroke = index === activeIndex && "red";

              return (
                <Cell
                  cursor="pointer"
                  fill={color}
                  key={`cell-${index}`}
                  stroke={stroke}
                  strokeWidth={2}
                  strokeDasharray="5,5"
                />
              );
            })}
          </Bar>
        </BarChart>
      </Grid>
    );
  };

  return deptData && category ? (
    <Grid container justify="flex-end" alignItems="center">
      <Grid item className={classes.deptSlider}>
        <DeptBarSlider handleChangeSlider={onChangeSlider} />
      </Grid>
      {makeDeptBar()}
    </Grid>
  ) : null;
};

export default DeptBar;