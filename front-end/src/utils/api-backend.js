import config from "../config";
// const API_URL = "http://localhost:4000/";

//This file contains all the front end API calls

// Function Name: getAllWatchListIDStocks
// Purpose: Fetch all the stock entries against a unqiue watch list id
// Parameters: watchListID

export const getAllWatchListIDStocks = async (watchListID) => {
  const apiUrl = `${config.app.host}getAllWatchListRecords/${watchListID}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.lists;
  } catch (e) {
    console.log(e);
    return "Error Fetching Data";
  }
};

// Function Name: removeWatchListFromWatchLists
// Purpose: Delete a watch list against a unqiue watch list id
// Parameters: watchlist_id

export const removeWatchListFromWatchLists = async (watchlist_id) => {
  const apiURL = `${config.app.host}removeWatchlist/${watchlist_id}`;

  try {
    const response = await fetch(apiURL, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error removing WL:", error);
  }
};

// Function Name: removeStockFromWatchList
// Purpose: Delete a stock against a unqiue stock id
// Parameters: stockID

export const removeStockFromWatchList = async (stockID) => {
  const apiURL = `${config.app.host}removeStock/${stockID}`;

  try {
    const response = await fetch(apiURL, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error removing stock:", error);
  }
};

// Function Name: getAllStocks
// Purpose: Fetch all the stocks for a certain watch list
// Parameters: watchListid

export const getAllStocks = async (watchListId) => {
  const apiURL = `${config.app.host}getWatchListStocks/${watchListId}`;
  console.log("apiURL getAllStocks", apiURL);
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.data;
  } catch (e) {
    return e;
  }
};

// Function Name: getAllWatchLists
// Purpose: Fetch all the watch lists for a certain user
// Parameters: userID

export const getAllWatchLists = async (userID) => {
  const apiURL = `${config.app.host}getwatchlist/${userID}`;
  console.log("apiURL getAllWatchLists", apiURL);

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.data;
  } catch (e) {
    return e;
  }
};

// Function Name: addNewWatchList
// Purpose: Add a new watch list for a certain user
// Parameters: userID, watchListName

export const addNewWatchList = async (userID, watchListName) => {
  const apiURL = `${config.app.host}addwatchlist`;

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        watchListName: watchListName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return "Error fetching data";
  }
};

// Function Name: addNewStock
// Purpose: Add a new stock into the database
// Parameters: StockData

export const addNewStock = async (StockData) => {
  const apiURL = `${config.app.host}addstock`;
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(StockData),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      console.log(data.StockId);
      return data.StockId;
    } else {
      return null;
    }
  } catch (e) {
    return "Error fetching data";
  }
};

// Function Name: addCompany
// Purpose: Add a new company into the database
// Parameters: CompanyData

export const addCompany = async (CompanyData) => {
  const apiURL = `${config.app.host}addcompany`;
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(CompanyData),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.companyId) {
      return data.companyId;
    } else {
      return null;
    }
  } catch (e) {
    return "Error fetching data";
  }
};

// Function Name: addWatchListItem
// Purpose: Add a new stock into a watch list
// Parameters: ListData

export const addWatchListItem = async (ListData) => {
  const apiURL = `${config.app.host}addWatchListRecord`;
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(ListData),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return "Error fetching data";
  }
};
