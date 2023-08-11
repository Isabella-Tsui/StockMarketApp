import { Divider, Spin, message } from "antd";
import React, { useState, useEffect } from "react";
import styles from "../pages/Home.module.css";
import { getAllWatchLists, addNewWatchList } from "../utils/api-backend";

//This file contains the component which allows a user
// to create a watch list

const AddToWatchList = ({ addStockToWatchList }) => {
  const userID = sessionStorage.getItem("userID");
  const [addWatchList, setAddWatchList] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchListName, setWatchListName] = useState("");
  const [messageAPI, contextHolder] = message.useMessage();

  // Function Name: handleAddWatchlist
  // Purpose: Handles the logic for creating a watch list
  // Parameters: None

  const handleAddWatchlist = async () => {
    const response = await addNewWatchList(userID, watchListName);

    if (response) {
      setWatchListName("");
      setAddWatchList(!addWatchList);
      message.open({
        type: "success",
        content: "Watch list added successfully",
        duration: 1,
      });
    } else {
      messageAPI.error("ERROR adding watchlist");
    }
  };

  //Re-renders when a new watch list is added
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      console.log("userID", userID);
      const data = await getAllWatchLists(userID);
      console.log("API Response Data:", data);
      setList(data);
      console.log("list data: ", data);
      setLoading(false);
    };
    fetchList();
  }, [addWatchList, userID]);

  if (loading) {
    return <Spin />;
  }

  //Returns the form that displays a users watch lists
  //in the home page.

  return (
    <>
      {contextHolder}

      <div className={styles.addtoWatchList}>
        {list && (
          <ul>
            {list.map((item) => (
              <li
                className={styles.singleItem}
                key={item.watchlist_id}
                onClick={() => {
                  addStockToWatchList(item.watchlist_id);
                }}
              >
                {item.watchlist_name}
              </li>
            ))}
          </ul>
        )}

        <Divider size="large"> </Divider>

        <div class={styles.newWatchList}>
          <button
            onClick={() => {
              setAddWatchList(!addWatchList);
            }}
          >
            Add a New WatchList
          </button>

          {addWatchList && (
            <div className={styles.addWatchList}>
              <input
                type="text"
                placeholder="Enter a watch list name"
                value={watchListName}
                onChange={(e) => {
                  setWatchListName(e.target.value);
                }}
              />
              <button onClick={handleAddWatchlist}>Add</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToWatchList;
