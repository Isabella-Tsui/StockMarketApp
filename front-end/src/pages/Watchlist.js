// import React, { useEffect, useState } from "react";
// import styles from "./Home.module.css";
// import { Divider } from "antd";
// import * as FaIcons from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { getAllWatchlists } from "../utils/api-backend";

// export default function WatchList({ isAuthenticated }) {
//   const navigate = useNavigate();
//   const userId = sessionStorage.getItem("userID");
//   const [watchList, setWatchList] = useState([]);

//   useEffect(() => {
//     const watchListItems = async () => {
//       console.log("userId", userId);
//       const response = await getAllWatchlists(userId);
//       console.log("response", response);
//       setWatchList(response);
//     };
//     watchListItems();
//   }, [userId]);

//   if (watchList.length === 0) {
//     return <p> You have no watch lists. Please create one. </p>;
//   }

//   return (
//     <>
//       {isAuthenticated}
//       <div className={styles.home}>
//         <div className={styles.container}>
//           <h1>Your Watch List</h1>
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
//               {watchList.map((item) => (
//                 <li key={item.watchlist_id}>
//                   <div className={styles.wishListData}>
//                     <h3>{item.watchlist_name}</h3>
//                   </div>

//                   <div className={styles.icons}>
//                     <FaIcons.FaEye
//                       onClick={() => {
//                         navigate("/wishlist");
//                       }}
//                       style={{
//                         // blue color
//                         color: "#0000ff",
//                       }}
//                     />
//                   </div>
//                 </li>
//               ))}
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
import { useParams } from "react-router-dom";
import { getAllStocks, removeStockFromWatchList } from "../utils/api-backend";

export default function WishList({ isAuthenticated }) {
  const { watchListid } = useParams();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const watchListStocks = async () => {
      setLoading(true);
      const response = await getAllStocks(watchListid);
      setStocks(response);
    };
    setLoading(true);
    watchListStocks();
    setLoading(false);
  }, [stocks]);

  const handleRemoveStock = async (stockID) => {
    try {
      await removeStockFromWatchList(stockID);
      setStocks((prevStocks) =>
        prevStocks.filter((stock) => stock.stockID !== stockID)
      );
    } catch (error) {
      console.error("Error while removing stock:", error);
    }
  };

  if (loading) return <Spin />;

  if (stocks === undefined || stocks.length === 0) {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <p> You have no stocks. Please add some. </p>{" "}
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated}
      <div className={styles.home}>
        <div className={styles.container}>
          <h1>Stocks in watch list</h1>
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
              {stocks.map((item) => (
                <li key={item.stock_id}>
                  <div className={styles.stocksData}>
                    <h3>{item.company_id}</h3>
                  </div>

                  <div className={styles.icons}>
                    <FaIcons.FaTrash
                      onClick={() => {
                        handleRemoveStock(item.stock_id);
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
