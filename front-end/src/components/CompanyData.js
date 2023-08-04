import React from "react";
import { useState, useEffect } from "react";
import { getCompany } from "../utils/apicall";
import { Spin, Card } from "antd";

const CompanyData = ({ quoteText, setCompanyData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanyData = async () => {
      setLoading(true);
      const data = await getCompany(quoteText);
      setData(data);
      setCompanyData(data);
      setLoading(false);
    };

    getCompanyData();
  }, [quoteText]);

  if (loading) return <Spin />;

  return (
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
  );
};

export default CompanyData;
