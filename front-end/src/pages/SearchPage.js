import React, { useState } from "react";
import "./SearchPage.css";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      symbol: "TSCO.LON",
      name: "Tesco PLC",
      type: "Equity",
      region: "United Kingdom",
      marketOpen: "08:00",
      marketClose: "16:30",
      timezone: "UTC+01",
      currency: "GBX",
      matchScore: "0.7273",
    },
    {
      symbol: "TSCDF",
      name: "Tesco plc",
      type: "Equity",
      region: "United States",
      marketOpen: "09:30",
      marketClose: "16:00",
      timezone: "UTC-04",
      currency: "USD",
      matchScore: "0.7143",
    },
  ]);

  //API Function

  const getStocks = async () => {
    //fetch from alpha vantage API
    setLoading(true);

    console.log(search);
    //fetch data
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=NBPLF64PXN81MAB9`
    );

    //convert data to json
    const data = await response.json();
    console.log(data);
    setData(data.bestMatches);
    setLoading(false);
  };

  return (
    <div className="main-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for stocks, ETFs, and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getStocks}>Search</button>
      </div>

      <div className="search-list">
        <h1>Best Match</h1>
        <h4>Symbol Name Type Region Market Open Market Close Currency</h4>
        <ul>
          {loading ? <h1>Loading...</h1> : null}
          {data.length === 0 && <h1> No results available</h1>}
          {data.length !== 0 &&
            data.map((item, index) => {
              return (
                <li key={index}>
                  <h2>{item["1. symbol"]}</h2>
                  <h3>{item["2. name"]}</h3>
                  <h4>{item["3. type"]}</h4>
                  <h4>{item["4. region"]}</h4>
                  <h4>{item["5. marketOpen"]}</h4>
                  <h4>{item["6. marketClose"]}</h4>
                  <h4>{item["7. timezone"]}</h4>
                  <h4>{item["8. currency"]}</h4>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
