import React from "react";
import { Card, Typography } from "antd";

/*
This file contains the component which displays the monetary
and company data in the watch list 
*/

const ShowStockData = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "50px",
      }}
    >
      <div>
        <Typography.Title level={3} style={{ margin: "16px" }}>
          Stock Details
        </Typography.Title>
        <Card
          style={{
            width: "100%",
            margin: "16px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
          }}
          hoverable
          className="stock-card"
        >
          <ul>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Current Price
              </Typography.Title>
              <span>{data.current_price} $</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Previous Close
              </Typography.Title>
              <span>{data.change}$</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Percentage Change
              </Typography.Title>
              <span
                style={{
                  color: data.dp > 0 ? "green" : "red",
                }}
              >
                {data.percentage_change}%
              </span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Daily Change
              </Typography.Title>
              <span>{data.open}</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                High
              </Typography.Title>
              <span>{data.high}$</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Low
              </Typography.Title>
              <span>{data.low}$</span>
            </li>
          </ul>
        </Card>
      </div>

      <div>
        <Typography.Title level={3} style={{ margin: "16px" }}>
          Company Details
        </Typography.Title>
        <Card
          hoverable
          cover={
            <img
              alt={data.name}
              src={data.logo}
              style={{
                width: "120px",
                height: "120px",

                display: "block",
              }}
            />
          }
          style={{
            width: "90%",
            margin: "16px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
          }}
        >
          <Card.Meta title={data.name} description={`Ticker: ${data.ticker}`} />
          <p>Country: {data.country}</p>
          <p>Currency: {data.currency}</p>
          <p>Estimate Currency: {data.estimateCurrency}</p>
          <p>Exchange: {data.exchange}</p>
          <p>Finnhub Industry: {data.finnhubIndustry}</p>
          <p>Market Capitalization: {data.marketCapitalization}</p>
          <p>Phone: {data.phone}</p>
          <p>Share Outstanding: {data.shareOutstanding}</p>
          <p>IPO: {data.ipo}</p>
          <p>
            <a href={data.weburl} target="_blank" rel="noopener noreferrer">
              {data.weburl}
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ShowStockData;
