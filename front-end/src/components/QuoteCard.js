import React, { useState, useEffect } from "react";
import { Card, Spin, Skeleton, Typography } from "antd";
import { getQuote, getCompany } from "../utils/apicall";

//This file contains the component that renders a
//particular stocks data

const QuoteCard = ({ quoteText, setStockData, setCompanyData }) => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [USAStock, setUSAStock] = useState(false);

  //Re-render when the stock is changed and display the
  //stock if it is not from the US

  useEffect(() => {
    const checkUSAMarket = async () => {
      const USAMarket = await getCompany(quoteText);
      setUSAStock(USAMarket);

      if (USAMarket.country === "US") {
        const data = await getQuote(quoteText);
        setQuote(data);
        setStockData(data);
        sessionStorage.setItem("USStock", "true");
      } else {
        sessionStorage.setItem("USStock", "false");
      }

      setLoading(false);
    };

    checkUSAMarket();
  }, [quoteText]);

  if (loading) return <Spin />;

  //Returns the company data if the stock is from the US,
  //otherwise, returns a message.

  return (
    <Card
      style={{
        width: "100%",
        margin: "16px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
      }}
      hoverable
    >
      {USAStock.country === "US" ? (
        loading ? (
          <Skeleton active />
        ) : (
          <ul>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Current Price
              </Typography.Title>
              <span>{quote.c} $</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Previous Close
              </Typography.Title>
              <span>{quote.d}$</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Percentage Change
              </Typography.Title>
              <span
                style={{
                  color: quote.dp > 0 ? "green" : "red",
                }}
              >
                {quote.dp}%
              </span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Daily Change
              </Typography.Title>
              <span>{quote.o}</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                High
              </Typography.Title>
              <span>{quote.h}$</span>
            </li>
            <li>
              <Typography.Title level={5} style={{ margin: "0" }}>
                Low
              </Typography.Title>
              <span>{quote.l}$</span>
            </li>
          </ul>
        )
      ) : (
        <Typography.Title level={5} style={{ margin: "0" }}>
          You don't have access to stock data.
        </Typography.Title>
      )}
    </Card>
  );
};

export default QuoteCard;
