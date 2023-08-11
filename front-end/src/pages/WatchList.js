import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Divider, Spin, Modal } from "antd";
import * as FaIcons from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  getAllWatchListIDStocks,
  removeStockFromWatchList,
} from "../utils/api-backend";
import ShowStockData from "./ShowStockData";

//This file contains the component which renders all the stocks
//in a watch list

//Previously used get all stocks here

export default function WishList({ isAuthenticated }) {
  const { id } = useParams();
  console.log("watchlist id", id);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockRemoved, setStockRemoved] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  //Re-render a component when a stock is deleted from the list
  useEffect(() => {
    const watchListStocks = async () => {
      const response = await getAllWatchListIDStocks(id);
      setStocks(response);
      console.log("get all stocks in watch loist response: ", response);
      setLoading(false);
    };

    // Set timmer so that if the API reponse is fast the transition
    // is not jarring to the user

    setTimeout(watchListStocks, 1000);
    setStockRemoved(true);
  }, [stockRemoved, id]);

  // Function Name: handleRemoveStock
  // Purpose: Deletes a stock from the watch list
  // Parameters: stockID

  const handleRemoveStock = async (stockID) => {
    try {
      await removeStockFromWatchList(stockID);
      setStocks((prevStocks) =>
        prevStocks.filter((stock) => stock.stockID !== stockID)
      );

      setStockRemoved(!stockRemoved);
    } catch (error) {
      console.error("Error while removing stock:", error);
    }
  };

  if (loading)
    return (
      <>
        <div
          style={{ textAlign: "center", fontSize: "30px", marginTop: "30px" }}
        >
          <Spin />
        </div>
      </>
    );

  //Check is the watch lists has stocks. If they don't, return a message,
  //otherwise, display all their stocks.
  if (stocks === undefined || stocks.length === 0) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <p> You have no stocks. Please add some. </p>{" "}
        </div>
      </div>
    );
  }

  //If the user clicks the eye they will be taken to the component which
  //renders all the stock information. Otherwise, they have the option
  //to remove the stock.

  return (
    <>
      {isAuthenticated}
      <div className={styles.home}>
        <div className={styles.container}>
          <h1>Stocks in Watch List</h1>
          <Divider
            size="large"
            style={{
              margin: "16px 0",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
              height: "2px",
              backgroundColor: "#000000",
            }}
          />
          <div className={styles.wishList}>
            <ul>
              {stocks.map((item) => (
                <li
                  key={item.stock_id}
                  onClick={() => {
                    setSelectedStock(item);
                  }}
                >
                  <div className={styles.stocksData}>
                    <h3>{item.stock_id}</h3>
                  </div>

                  <div className={styles.icons}>
                    <FaIcons.FaEye
                      style={{
                        color: "#353661",
                      }}
                      onClick={() => {
                        setSelectedStock(item);
                        setModal2Open(true);
                      }}
                    />
                    <FaIcons.FaTrash
                      onClick={() => {
                        handleRemoveStock(item.stock_id);
                      }}
                      style={{
                        color: "#9e2929",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal
        title=""
        centered
        width={800}
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
        <ShowStockData data={selectedStock} />
      </Modal>
    </>
  );
}
