import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";

export default function Trending({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className="trending">
        <h1>Trending</h1>
        <TradingViewWidget />
      </div>
    </>
  );
}
