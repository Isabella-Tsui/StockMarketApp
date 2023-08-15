const baseURL = "https://finnhub.io/api/v1/";
const API_KEY = "cj23bg1r01qi64tfujk0cj23bg1r01qi64tfujkg";

//This file contains all the API calls made to the external database Finnhub

// Function Name: getQuote
// Purpose: Fetch all the open, close, high, low, etc data for a stock
// Parameters: quoteText - unique ticker symbol

export const getQuote = async (quoteText) => {
  const apiUrl = `${baseURL}quote?symbol=${quoteText}&token=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

// Function Name: getCompany
// Purpose: Fetch all data for a company
// Parameters: quoteText - unique ticker symbol

export const getCompany = async (quoteText) => {
  const apiUrl = `${baseURL}stock/profile2?symbol=${quoteText}&token=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

// Function Name: handleSearch
// Purpose: Fetch all companies that are similarly named to the user input
// Parameters: input - user input

export const handleSearch = async (input) => {
  const apiURL = `${baseURL}search?q=${input}&token=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return data.result;
  } catch (error) {
    return null;
  }
};

// Function Name: getHistoricalData
// Purpose: Fetches all the data to populate the chart
// Parameters: quoteText - unique ticker symbol

export const getHistoricalData = async (quoteText) => {
  const oneMonth = 31536000;
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - oneMonth;
  const apiURL = `${baseURL}/stock/candle?symbol=${quoteText}&resolution=1&from=${startDate}&to=${endDate}&token=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
