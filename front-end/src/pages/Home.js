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

/*
This file contains all the components for the home page.
The home page consists of a stock data display, company data
display, and a chart with all the stock data for the last year. 
*/

export default function Home({ isAuthenticated }) {
  const [quoteText, setQuoteText] = useState("AAPL"); //Default stock to be displayed
  const [stockData, setStockData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const [messageAPI, contextHolder] = message.useMessage();

  /*
   Function Name: addStockData
   Purpose: Add a new stock into the database
   Parameters: None
  */

  const addStockData = async () => {
    const data = {
      stock_id: quoteText,
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

  /* 
   Function Name: addCompanyData
   Purpose: Add a new company data entry to the database
   Parameters: None
  */

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
    return companyID;
  };

  /* 
  Function Name: addStockToWatchList
  Purpose: Add a new US stock to a watch list
  Parameters: id - unqiue stock ticker symbol
  */

  const addStockToWatchList = async (id) => {
    const flag = sessionStorage.getItem("USStock");
    if (flag !== "true") {
      messageAPI.error(
        "You can only add stocks from the US to your watch lists."
      );

      return;
    }
    const stockID = await addStockData();
    if (stockID) {
      const companyID = await addCompanyData();
      if (companyID) {
        await addWatchList(id, stockID, companyID);
      } else {
      }
    }
  };

  /* 
  Function Name: addWatchList
  Purpose: Add a new watch list entry
  Parameters: id (watch list id), stockID, companyID
  */

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
    }
  };

  /*
  Here we are returning the stock data (left), company data (right),
  and the Modal which renders the component to create and add stocks
  to a watch list.
  */

  return (
    <>
      {contextHolder}
      {isAuthenticated}
      <div className={styles.home}>
        <Input setQuoteText={setQuoteText} />

        <div className={styles.wishList}>
          <div></div>
          {
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                Add to Watch List
              </div>
            </Button>
          }
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
        okButtonProps={{
          style: {
            backgroundColor: "#353661",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "3px 22px 10px 6px",
            fontSize: "16px",
            alignItems: "center",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#353661",
            color: "#ffffff",
            border: "2px solid #000000",
            borderRadius: "8px",
            padding: "2px 22px 10px 4px",
            fontSize: "16px",
            alignItems: "center",
          },
        }}
        closeIcon={<span style={{ paddingRight: "31px" }}>X</span>}
      >
        <AddToWatchList addStockToWatchList={addStockToWatchList} />
      </Modal>
    </>
  );
}
