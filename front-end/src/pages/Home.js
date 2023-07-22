import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home({ isAuthenticated }) {
  const [activeData, setActiveData] = useState([]);
  const [gainersData, setGainersData] = useState([]);
  const [losersData, setLosersData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [toggle, setToggle] = useState(true);

  //call api from here
  useEffect(() => {
    const fetchActiveData = async () => {
      setLoading(true);

      //Demo API key in use need to change later
      const response = await fetch(
        "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"
      );

      const data = await response.json();
      setGainersData(data.top_gainers);
      setLosersData(data.top_losers);
      setActiveData(data.top_gainers);

      console.log(data);
      setLoading(false);
    };

    fetchActiveData();
  }, []);

  //To switch between the losers and gainers data
  const hangleToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      setActiveData(losersData);
    } else {
      setActiveData(gainersData);
    }
  };

  //Add to watch list handler

  const handleAddToWatchlist = (data) => {
    console.log("add to watchlist", data);
  };

  return (
    <>
      {isAuthenticated}
      <div className="home">
        <h1>Trending</h1>
        <div className="buttons">
          <button
            className={toggle ? "active" : "button"}
            onClick={hangleToggle}
          >
            Gainers
          </button>
          <button
            className={!toggle ? "active" : "button"}
            onClick={hangleToggle}
          >
            Losers
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="container">
            {activeData.map((data) => (
              <div className="card">
                <p>{data.ticker}</p>
                <p>{data.price}</p>
                <p>{data.change_amount}</p>
                <p>{data.change_percentage}</p>
                <p>{data.volume}</p>
                <button
                  className="add-to-watch-list"
                  onClick={() => {
                    handleAddToWatchlist(data);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
