import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Divider, Spin } from "antd";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllWatchLists,
  removeWatchListFromWatchLists,
} from "../utils/api-backend";

/*This file contains the component which renders all the watch lists
under a certain user*/

export default function WatchList({ isAuthenticated }) {
  const userId = sessionStorage.getItem("userID");
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchListRemoved, setWatchListRemoved] = useState(false);
  const navigate = useNavigate();

  //Re-render the component when a watch list is removed
  useEffect(() => {
    const watchListItems = async () => {
      const response = await getAllWatchLists(userId);
      setWatchList(response);
      setLoading(false);
    };

    // Set a timmer so that if the API reponse is very fast
    // the transition is not jarring to the user
    setTimeout(watchListItems, 1000);
    setWatchListRemoved(false);
  }, [watchListRemoved, userId]);

  /* 
  Function Name: handleRemoveWatchlist
  Purpose: Deletes a watch list and all the stocks associated with it
  Parameters: watchlistID 
  */

  const handleRemoveWatchlist = async (watchlistID) => {
    try {
      await removeWatchListFromWatchLists(watchlistID);
      setWatchList((prevWatchLists) =>
        prevWatchLists.filter(
          (watchList) => watchList.watchlistID !== watchlistID
        )
      );
      setWatchListRemoved(true);
    } catch (error) {}
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

  //Check is a user has watch lists, if they don't return a message.
  //Otherwise, display all their lists.

  if (watchList === undefined || watchList.length === 0) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <p> You have no watch lists. Please create one. </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated}

      <div className={styles.home}>
        <div className={styles.container}>
          <h1>{userId}'s Watch Lists</h1>

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
              {watchList.map((item) => (
                <li key={item.watchlist_id}>
                  <div className={styles.wishListData}>
                    <h3>{item.watchlist_name}</h3>
                  </div>

                  <div className={styles.icons}>
                    <FaIcons.FaEye
                      onClick={() => {
                        navigate(`/wishlist/${item.watchlist_id}`);
                      }}
                      style={{
                        color: "#353661",
                      }}
                    />
                    <FaIcons.FaTrash
                      onClick={() => {
                        handleRemoveWatchlist(item.watchlist_id);
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
    </>
  );
}
