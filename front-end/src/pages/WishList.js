// import React from "react";
// import styles from "./Home.module.css";
// import { Divider } from "antd";
// import * as FaIcons from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function WishList({ isAuthenticated }) {
//   const navigate = useNavigate();
//   return (
//     <>
//       {isAuthenticated}
//       <div className={styles.home}>
//         <div className={styles.container}>
//           <h1>Your WatchList</h1>
//           <Divider
//             size="large"
//             style={{
//               margin: "16px 0",
//               boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
//               height: "2px",
//               // black color
//               backgroundColor: "#000000",
//             }}
//           />
//           <div className={styles.wishList}>
//             <ul>
//               <li>
//                 <div className={styles.wishListData}>
//                   <h3>Watch List 1</h3>
//                 </div>

//                 <div className={styles.icons}>
//                   <FaIcons.FaEye
//                     onClick={() => {
//                       navigate("/wishlist");
//                     }}
//                     style={{
//                       // blue color
//                       color: "#0000ff",
//                     }}
//                   />
//                 </div>
//               </li>

//               <li>
//                 <div className={styles.wishListData}>
//                   <h3>Watch List 1</h3>
//                 </div>

//                 <div className={styles.icons}>
//                   <FaIcons.FaEye
//                     style={{
//                       // blue color
//                       color: "#0000ff",
//                     }}
//                   />
//                 </div>
//               </li>

//               <li>
//                 <div className={styles.wishListData}>
//                   <h3>Watch List 1</h3>
//                 </div>

//                 <div className={styles.icons}>
//                   <FaIcons.FaEye
//                     style={{
//                       // blue color
//                       color: "#0000ff",
//                     }}
//                   />
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Divider, Spin } from "antd";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllWatchLists,
  removeWatchListFromWatchLists,
} from "../utils/api-backend";

export default function WatchList({ isAuthenticated }) {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userID");
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchListRemoved, setWatchListRemoved] = useState(false);

  useEffect(() => {
    const watchListItems = async () => {
      setLoading(true);
      console.log("userId", userId);
      const response = await getAllWatchLists(userId);
      console.log("response", response);
      setWatchList(response);
      setLoading(false);
    };
    watchListItems();
    setWatchListRemoved(false);
  }, [watchListRemoved]);

  const handleRemoveWatchlist = async (watchlistID) => {
    try {
      console.log("trying to remove WL");
      await removeWatchListFromWatchLists(watchlistID);
      setWatchList((prevWatchLists) =>
        prevWatchLists.filter(
          (watchList) => watchList.watchlistID !== watchlistID
        )
      );
      setWatchListRemoved(true);
      console.log(" made it through trying to remove WL");
    } catch (error) {
      console.error("Error while removing WLLL:", error);
    }
  };

  if (watchList === undefined || watchList.length === 0) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <p> You have no watch lists. Please create one. </p>{" "}
        </div>
      </div>
    );
  }

  // if (loading) {
  //   return <Spin />;
  // }

  return (
    <>
      {isAuthenticated}
      <div className={styles.home}>
        <div className={styles.container}>
          <h1>Your Watch Lists</h1>
          <Divider
            size="large"
            style={{
              margin: "16px 0",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
              height: "2px",
              // black color
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
                        color: "#0000ff",
                      }}
                    />
                    <FaIcons.FaTrash
                      onClick={() => {
                        handleRemoveWatchlist(item.watchlist_id);
                      }}
                      style={{
                        color: "#ff0000",
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
