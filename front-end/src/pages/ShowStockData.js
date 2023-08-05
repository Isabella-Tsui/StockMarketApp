import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { getCompany, getQuote } from "../utils/apicall";

//This file contains the component which renders all the stock data
//when a user clicks on the eye icon in the stock list

const ShowStockData = ({ data }) => {
  console.log(data);
  const [stockData, setStockData] = useState({});
  const [companyData, setCompanyData] = useState({});

  //Get the stock and company data to be displayed
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const stockResponse = await getQuote(data.company_id);
        setStockData(stockResponse);

        const companyResponse = await getCompany(data.company_id);
        setCompanyData(companyResponse);
      }
    };

    fetchData();
  }, []);

  //Display the data similarlly to that in the homepage
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
              <span>{stockData.c} $</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Previous Close
              </Typography.Title>
              <span
                style={{
                  color: stockData.d > 0 ? "green" : "red",
                }}
              >
                {stockData.d}$
              </span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Percentage Change
              </Typography.Title>
              <span
                style={{
                  color: stockData.dp > 0 ? "green" : "red",
                }}
              >
                {stockData.pc}%
              </span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Daily Change
              </Typography.Title>
              <span>{stockData.o}</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                High
              </Typography.Title>
              <span>{stockData.h}$</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Low
              </Typography.Title>
              <span>{stockData.l}$</span>
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
              alt={companyData.name}
              src={companyData.logo}
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
          <Card.Meta
            title={companyData.name}
            description={`Ticker: ${companyData.ticker}`}
          />
          <p>Country: {companyData.country}</p>
          <p>Currency: {companyData.currency}</p>
          <p>Estimate Currency: {companyData.estimateCurrency}</p>
          <p>Exchange: {companyData.exchange}</p>
          <p>Finnhub Industry: {companyData.finnhubIndustry}</p>
          <p>Market Capitalization: {companyData.marketCapitalization}</p>
          <p>Phone: {companyData.phone}</p>
          <p>Share Outstanding: {companyData.shareOutstanding}</p>
          <p>IPO: {companyData.ipo}</p>
          <p>
            <a
              href={companyData.weburl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.weburl}
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ShowStockData;
