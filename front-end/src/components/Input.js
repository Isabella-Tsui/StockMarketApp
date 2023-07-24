import React from 'react'
import { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { handleSearch } from '../utils/apicall'
import styles from '../pages/Home.module.css'
import Suggestions from './Suggestions'

const Input = ({ setQuoteText }) => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState([]) // suggestion results

  const handleCancel = (e) => {
    setInput('')
    setResults([])
  }

  return (
    <>
      <div className={styles.search}>
        <input
          type='text'
          value={input}
          placeholder='Search Stocks'
          onChange={(e) => {
            setInput(e.target.value)
            if (e.target.value === '') setResults([])
          }}
        />

        {input !== '' && (
          <button onClick={handleCancel}>
            {/* Removing Text */}
            <FaIcons.FaTimes />
          </button>
        )}
        <button
          onClick={async () => {
            const data = await handleSearch(input)
            console.log(data)
            setResults(data)

            console.log(results)
          }}
          className={styles.searchBtn}
        >
          <FaIcons.FaSearch />
        </button>
      </div>
      {results.length > 0 && (
        <Suggestions
          results={results}
          setQuoteText={setQuoteText}
          setResults={setResults}
        />
      )}
    </>
  )
}

export default Input
