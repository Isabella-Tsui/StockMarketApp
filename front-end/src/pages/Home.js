import React from "react";
import Navbar from "../components/Navbar";

export default function Home({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className="home">
        <h1>Home</h1>
      </div>
    </>
  );
}
