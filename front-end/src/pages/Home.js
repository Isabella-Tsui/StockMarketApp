import React, { useState } from "react";
import Input from "../components/Input";
import QuoteCard from "../components/QuoteCard";
import styles from "./Home.module.css";
import CompanyData from "../components/CompanyData";
import Chart from "../components/Chart";
import AddToWatchList from "./AddToWatchList";
import { Button, Typography, Modal, message } from "antd";
import {
  addNewStock,
  addCompany,
  addWatchListItem,
} from "../utils/api-backend";

export default function Home({ isAuthenticated }) {
  const [quoteText, setQuoteText] = useState("AAPL");
  const [stockData, setStockData] = useState(null); //dependency for QuoteCard
  const [companyData, setCompanyData] = useState(null); //dependency for companyData
  const [modal2Open, setModal2Open] = useState(false); // dependency for modal
  const [messageAPI, contextHolder] = message.useMessage();

  // add a stock into the db
  const addStockData = async () => {
    const data = {
      stock_id: Math.random().toString(35).substring(7),
      current_price: stockData.c,
      change: stockData.d,
      percentage_change: stockData.dp,
      open: stockData.o,
      high: stockData.h,
      low: stockData.l,
    };
    const stockID = await addNewStock(data);
    return stockID;
  };

  // add a company to the db
  const addCompanyData = async () => {
    const retrivedCompanyData = {
      country: companyData.country,
      currency: companyData.currency,
      estimate_currency: companyData.estimateCurrency,
      exchange: companyData.exchange,
      finnhubIndustry: companyData.finnhubIndustry,
      ipo: companyData.ipo,
      logo: companyData.logo,
      market_capitalization: companyData.marketCapitalization,
      name: companyData.name,
      phone: companyData.phone,
      share_outstanding: companyData.shareOutstanding,
      ticker: companyData.ticker,
      weburl: companyData.weburl,
    };

    const companyID = await addCompany(retrivedCompanyData);
    console.log("companyID", companyID);
    return companyID;
  };

  // add a stock into the db
  const addWatchList = async (id, stockID, companyID) => {
    const listData = {
      watchlist_id: id,
      stock_id: stockID,
      company_id: companyID,
    };
    const response = addWatchListItem(listData);
    if (response) {
      messageAPI.success("stock added successfully");
    } else {
      console.log("stock not added successfully");
    }
  };

  //Add stock, then corresponding company, then add to specified watch list
  const addStockToWatchList = async (id) => {
    const stockID = await addStockData();
    console.log("stockID", stockID);
    if (stockID) {
      const companyID = await addCompanyData();
      console.log("companyID", companyID);
      if (companyID) {
        console.log("inside addStockToWatchList before add Watchlist");
        await addWatchList(id, stockID, companyID);
      } else {
        console.log("error");
      }
    }
  };

  return (
    <>
      {contextHolder}
      {isAuthenticated}
      <div className={styles.home}>
        <Input setQuoteText={setQuoteText} />

        <div className={styles.wishList}>
          <div></div>
          <Button
            type="primary"
            style={{
              margin: "0px 16px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
              backgroundColor: "#f5f5f5",
              color: "#000000",
              borderColor: "#f5f5f5",
            }}
            onClick={() => {
              setModal2Open(true);
            }}
          >
            Add to Watch List
          </Button>
        </div>
        <div className={styles.stocksDetail}>
          <div className={styles.left}>
            <Typography.Title level={3}>Stock Details</Typography.Title>
            <QuoteCard quoteText={quoteText} setStockData={setStockData} />
          </div>

          <div className={styles.right}>
            <Typography.Title level={3}>Company Details</Typography.Title>
            <CompanyData
              quoteText={quoteText}
              setCompanyData={setCompanyData}
            />
          </div>
        </div>

        <div class={styles.chart}>
          <Chart quoteText={quoteText} />
        </div>
      </div>

      <Modal
        title="Add to Watch List"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <AddToWatchList addStockToWatchList={addStockToWatchList} />
      </Modal>
    </>
  );
}
