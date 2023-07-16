import React from "react";
import Navbar from "../components/Navbar";

export default function Watchlist({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className="watchlist">
        <h1>Watchlist</h1>
      </div>
    </>
  );
}
