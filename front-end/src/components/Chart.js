import React, { useState, useEffect } from "react";
import styles from "../pages/Home.module.css";
import { Spin, Typography, Card } from "antd";
import { getHistoricalData } from "../utils/apicall";
import { getCompany } from "../utils/apicall";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/*This file contains the component that renders the historical data chart */

/*
Function Name: convertUnixTimestampToDate
Purpose: Convert time into unix stamp
Parameters: unixTimestamp
*/

const convertUnixTimestampToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

/*
Function Name: formatData
Purpose: Take many arrays and turn them into data points
Parameters: data
*/

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

  //If the stock is not from the US, display an error message.
  //Otherwis, display the chart.
  if (!USAStock || USAStock.country !== "US") {
    return (
      <Card className={styles.chartNoAccess}>
        <Typography.Title level={5}>
          You don't have access to historical data for {quoteText} stocks.
        </Typography.Title>
      </Card>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <Typography.Title level={2}>Historical Details</Typography.Title>
      <Typography.Title level={3}>
        1 Month History of {quoteText} Stocks{" "}
      </Typography.Title>
      {loading ? (
        <Spin />
      ) : (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <defs>
                <linearGradient id="closeColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5E81AC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#5E81AC" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="openColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#81A1C1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#81A1C1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="highColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1c16d9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1c16d9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lowColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5fcbfa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#5fcbfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin", "dataMax"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#312e81"
                strokeWidth={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="open"
                stroke="#818281"
                strokeWidth={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke="#1c16d9"
                strokeWidth={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#5fcbfa"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart;
