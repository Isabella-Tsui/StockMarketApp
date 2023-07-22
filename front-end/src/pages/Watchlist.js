import React from "react";
import "./Watchlist.css";

export default function Watchlist({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className="watchlist">
        <h1>Watchlist</h1>
        <div className="container">
          <div className="rows">
            <p className="title">Title</p>
            <p className="value">Value</p>
          </div>
          <div className="rows">
            <p className="title">Title</p>
            <p className="value">Value</p>
          </div>
          <div className="rows">
            <p className="title">Title</p>
            <p className="value">Value</p>
          </div>
          <button>Remove from watchlist</button>
        </div>
      </div>
    </>
  );
}
