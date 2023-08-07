import React from "react";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { handleSearch } from "../utils/apicall";
import styles from "../pages/Home.module.css";
import Suggestions from "./Suggestions";

//This file contains the component which renders
//the stock search bar.

const Input = ({ setQuoteText }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  // Function Name: handleCancel
  // Purpose: Reset search bar
  // Parameters: None

  const handleCancel = () => {
    setInput("");
    setResults([]);
  };

  //Returns a list with the search results

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          value={input}
          placeholder="Search Stocks"
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value === "") setResults([]);
          }}
        />

        {input !== "" && (
          <button onClick={handleCancel}>
            <FaIcons.FaTimes />
          </button>
        )}
        <button
          onClick={async () => {
            const data = await handleSearch(input);
            console.log(data);
            setResults(data);

            console.log(results);
          }}
          className={styles.searchBtn}
        >
          <FaIcons.FaSearch />
        </button>
      </div>
      {results.length > 0 && (
        <div className={styles.suggestionMenu}>
          <Suggestions
            results={results}
            setQuoteText={setQuoteText}
            setResults={setResults}
          />
        </div>
      )}
    </>
  );
};

export default Input;
