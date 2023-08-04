const API_URL = "http://localhost:4000/";

export const removeWatchListFromWatchLists = async (watchlist_id) => {
  const apiURL = `${API_URL}removeWatchlist/${watchlist_id}`;
  console.log("apiURL", apiURL);
  try {
    const response = await fetch(apiURL, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("data", data);
    return data.data;
  } catch (error) {
    console.error("Error removing WL:", error);
  }
};

export const removeStockFromWatchList = async (stockID) => {
  const apiURL = `${API_URL}removeStock/${stockID}`;
  console.log("apiURL", apiURL);
  try {
    const response = await fetch(apiURL, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("data", data);
    return data.data;
  } catch (error) {
    console.error("Error removing stock:", error);
  }
};

// getting all the stocks against a watchlist id
export const getAllStocks = async (watchListid) => {
  const apiURL = `${API_URL}getWatchListStocks/${watchListid}`;
  console.log("apiURL", apiURL);
  try {
    //fetch all the stock records with this watch list id
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log("api data", data);
    return data.data;
  } catch (e) {
    return e;
  }
};

//getting all the watchlist
export const getAllWatchLists = async (userID) => {
  const apiURL = `${API_URL}getwatchlist/${userID}`;
  console.log("apiURL", apiURL);
  try {
    //fetch all the watch list records with this username
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log("api data", data);
    return data.data;
  } catch (e) {
    return e;
  }
};

//adding a new watch list
export const addNewWatchList = async (userID, watchListName) => {
  const apiURL = `${API_URL}addwatchlist`;
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

// add a stock
export const addNewStock = async (StockData) => {
  const apiURL = `${API_URL}addstock`;
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

// add a company
export const addCompany = async (CompanyData) => {
  const apiURL = `${API_URL}addcompany`;
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

//add a watch list entry
export const addWatchListItem = async (ListData) => {
  const apiURL = `${API_URL}addWatchListRecord`;
  console.log("ListData", ListData);
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(ListData),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("data addWatchListItem", data);
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return "Error fetching data";
  }
};
