import React, { useState, useEffect } from "react";
import { getCompany } from "../utils/apicall";
import { Spin, Card } from "antd";

//This file contains the component which renders
//all the companies data

const CompanyData = ({ quoteText, setCompanyData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [USAStock, setUSAStock] = useState(false);

  //Re-renders and shows dara only when the stock changes
  //to a US stock

  useEffect(() => {
    const checkUSAMarket = async () => {
      const USAMarket = await getCompany(quoteText);
      setUSAStock(USAMarket);

      if (USAMarket.country === "US") {
        const data = await getCompany(quoteText);
        setData(data);
        setCompanyData(data);
        sessionStorage.setItem("USStock", "true");
      } else {
        sessionStorage.setItem("USStock", "false");
      }

      setLoading(false);
    };

    checkUSAMarket();
  }, [quoteText, setCompanyData]);

  if (loading) return <Spin />;

  //Returns all the data concerning a company
  return (
    <>
      {USAStock.country === "US" ? (
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
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
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
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          You don't have access to company data outside of the US.
        </p>
      )}
    </>
  );
};

export default CompanyData;
