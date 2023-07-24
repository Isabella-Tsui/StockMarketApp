import React from 'react'
import styles from '../pages/Home.module.css'

const Suggestions = ({ results, setQuoteText, setResults }) => {
  console.log(results)
  return (
    <div className={styles.searchResults}>
      <ul>
        {results.map((result) => (
          <li
            key={result.symbol}
            onClick={() => {
              setQuoteText(result.displaySymbol)
              // setInput('')
              setResults([])
            }}
          >
            <span>{result.description}</span>
            <span>{result.displaySymbol}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
