const connection = require("./database/databaseConnection.js");

//This file contains all the API endpoints that
//are related to the watch lists

// Function Name: getWatchList
// Purpose: Retrieves all watch lists created by a user
// Parameters: req, res

const getWatchList = async (req, res) => {
  const userName = req.params.username; // forigen key in watch list

  connection.query(
    `SELECT * FROM watch_lists WHERE userid = '${userName}';`,
    async (err, data, fields) => {
      if (err) {
        console.log("got to err msg");
        console.log(err);
        res.json({
          success: false,
          msg: "An error has occurred, please try again",
        });
        return;
      }

      if (data && data.length > 0) {
        res.json({
          success: true,
          data: data,
        });
      } else {
        res.json({
          success: false,
          msg: "User not found, please try again",
        });
      }
    }
  );
};

// Function Name: addWatchList
// Purpose: Adds a watch list to the database
// Parameters: req, res

const addWatchList = async (req, res) => {
  const name = req.body.watchListName;
  const userid = req.body.userID;

  console.log(name, userid);

  connection.query(
    `INSERT INTO watch_lists (watchlist_name, userid ) VALUES ('${name}', '${userid}')`,
    async (err, data, fields) => {
      if (err) {
        console.log("got to err msg");
        res.json({
          success: false,
          msg: "An error has occurred, please try again",
        });
        return;
      }
      console.log(data);

      if (data) {
        res.json({
          success: true,
          msg: "Watchlist added",
        });
      } else {
        res.json({
          success: false,
          msg: "User not found, please try again",
        });
      }
    }
  );
};

// Function Name: addWatchListRecord
// Purpose: Add a stock and company to a particular watch list
// Parameters: req, res

const addWatchListRecord = async (req, res) => {
  const watchlist_id = req.body.watchlist_id;
  const stock_id = req.body.stock_id;
  const company_id = req.body.company_id;

  connection.query(
    `INSERT INTO watchlist_stocks (watchlist_id ,stock_id , company_id ) VALUE(${watchlist_id}, '${stock_id}', '${company_id}')`,
    async (err, data, fields) => {
      if (err) {
        console.log(err);
        console.log("Error while inserting WatchListData data");
        res.json({
          success: false,
          msg: "Error while inserting Company data",
        });
      } else {
        res.json({
          success: true,
          msg: "Successfully Added a Record",
        });
      }
    }
  );
};

// Function Name: getAllWatchListRecords
// Purpose: Get all watch lists against a watchlist ID
// Parameters: req, res

const getAllWatchListRecords = async (req, res) => {
  const watchlist_id = req.params.watchlistID;
  console.log("made it to getAllWatchlist records");
  connection.query(
    `SELECT ws.watchlist_id, ws.stock_id, s.*, c.*
    FROM watchlist_stocks AS ws
    JOIN stock_data AS s ON ws.stock_id = s.stock_id
    JOIN company_data AS c ON ws.company_id = c.ticker
    WHERE ws.watchlist_id = '${watchlist_id}';
    `,
    async (err, data, fields) => {
      if (err) {
        console.log(err);
        console.log("Error while inserting Company data");
        res.json({
          success: false,
          msg: "Error while inserting Company data",
        });
      } else {
        res.json({
          success: true,
          lists: data,
        });
        console.log("query data", data);
      }
    }
  );
};

// Function Name: getWatchListStocks
// Purpose: Get all stocks against a watch list
// Parameters: req, res

const getWatchListStocks = async (req, res) => {
  const watchlistId = req.params.watchlistId;

  connection.query(
    `SELECT * FROM watchlist_stocks WHERE watchlist_id = '${watchlistId}';`,
    async (err, data, fields) => {
      if (err) {
        console.log("Error fetching watchlist stocks:", err);
        res.json({
          success: false,
          msg: "An error has occurred, please try again",
        });
        return;
      }

      if (data && data.length > 0) {
        res.json({
          success: true,
          data: data,
        });
      } else {
        res.json({
          success: false,
          msg: "No stocks found for the watchlist",
        });
      }
    }
  );
};

// Function Name: removeWatchlist
// Purpose: Delete all the entries associated with a watch list
// Parameters: req, res

const removeWatchlist = async (req, res) => {
  const watchlistID = req.params.watchlistId;
  console.log("watchlistID", watchlistID);

  connection.query(
    `DELETE FROM watch_lists WHERE watchlist_id like '${watchlistID}';`,

    async (err, data, fields) => {
      if (err) {
        console.log("Error deleting stock:", err);
        res.json({
          success: false,
          msg: "An error has occurred, please try again MADE IT HERE",
        });
        return;
      }

      if (data && data.length > 0) {
        res.json({
          success: true,
          msg: "V bad",
        });
      } else {
        res.json({
          success: false,
          msg: "sucessfully deleted WL",
        });
      }
    }
  );
};

module.exports = {
  getWatchList,
  addWatchList,
  addWatchListRecord,
  getAllWatchListRecords,
  getWatchListStocks,
  removeWatchlist,
};
