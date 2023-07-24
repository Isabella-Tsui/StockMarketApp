import React from "react";
import Navbar from "../components/Navbar";

export default function Trending({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className="trending">
        <h1>Trending</h1>
      </div>
    </>
  );
}
