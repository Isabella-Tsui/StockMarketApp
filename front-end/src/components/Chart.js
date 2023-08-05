import React, { useState, useEffect } from "react";
import styles from "../pages/Home.module.css";
import { Spin, Typography } from "antd";
import * as FaIcons from "react-icons/fa";
import { getHistoricalData } from "../utils/apicall";
import {
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
} from "recharts";
import { getCompany } from "../utils/apicall";

//This file contains the component that renders the
//historical data chart

const Chart = ({ quoteText }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [USAStock, setUSAStock] = useState(false);

  //Re-renders if the stock is changed to a US stock.
  useEffect(() => {
    const fetchData = async () => {
      const USAMarket = await getCompany(quoteText);
      setUSAStock(USAMarket);

      if (USAMarket.country === "US") {
        const data = await getHistoricalData(quoteText);
        const filteredData = formatData(data);
        setHistoricalData(filteredData);
      }

      setLoading(false);
    };

    fetchData();
  }, [quoteText]);

  // Function Name: convertUnixTimestampToDate
  // Purpose: Convert time into unix stamp
  // Parameters: unixTimestamp

  const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    return new Date(milliseconds).toLocaleDateString();
  };

  // Function Name: formatData
  // Purpose: Take many arrays and turn them into data points
  // Parameters: data

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        close: item.toFixed(2),
        open: data.o[index].toFixed(2),
        high: data.h[index].toFixed(2),
        low: data.l[index].toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  //If the stock is not from the US display and error message
  //otherwise display the chart
  if (!USAStock || USAStock.country !== "US") {
    return (
      <Typography.Title level={5} style={{ margin: "0" }}>
        You don't have access to historical data for {quoteText} stock.
      </Typography.Title>
    );
  }

  //Return the chart

  return (
    <div className={styles.chartContainer}>
      <Typography.Title level={3}>Historical Details</Typography.Title>
      <Typography.Title level={4}>
        1 Year History of {quoteText} Stock{" "}
        <span>
          <FaIcons.FaChartLine />
        </span>
      </Typography.Title>
      {loading ? (
        <Spin />
      ) : (
        <div className={styles.chart}>
          <ResponsiveContainer>
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#312e81" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#312e81"
                fill="url(#chartColor)"
                fillOpacity={1}
                strokeWidth={0.5}
              />
              <Area
                type="monotone"
                dataKey="open"
                stroke="#818281"
                fill="#117e81"
                fillOpacity={1}
                strokeWidth={0.5}
              />
              <Area
                type="monotone"
                dataKey="high"
                stroke="#ff0000"
                fill="#387e81"
                fillOpacity={1}
                strokeWidth={0.5}
              />
              <Area
                type="monotone"
                dataKey="low"
                stroke="#00ff00"
                fill="#117e81"
                fillOpacity={1}
                strokeWidth={0.5}
              />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin", "dataMax"]} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart;
