const baseURL = 'https://finnhub.io/api/v1/'
const API_KEY = 'ciu1fopr01qvfma1gd70ciu1fopr01qvfma1gd7g'

export const getQuote = async (quoteText) => {
  const apiUrl = `${baseURL}quote?symbol=${quoteText}&token=${API_KEY}`

  try {
    const response = await fetch(apiUrl)

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCompany = async (quoteText) => {
  const apiUrl = `${baseURL}stock/profile2?symbol=${quoteText}&token=${API_KEY}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const handleSearch = async (input) => {
  // api call
  const apiURL = `${baseURL}search?q=${input}&token=${API_KEY}`

  try {
    const response = await fetch(apiURL)
    const data = await response.json()

    return data.result
  } catch (error) {
    console.log(error)
    return null
  }
}

// get stocks data for previous 1 Year.
export const getHistoricalData = async (quote) => {
  const apiURL = `${baseURL}/stock/candle?symbol=${quote}&resolution=1&from=1679476980&to=1679649780&token=${API_KEY}`

  try {
    const response = await fetch(apiURL)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
