const connection = require("./db/db.js"); //Added

// add a stock data into DB
const addAStockIntoDB = async (req, res) => {
  const stock_id = req.body.stock_id;
  const current_price = req.body.current_price;
  const change = req.body.change;
  const percentage_change = req.body.percentage_change;
  const open = req.body.open;
  const high = req.body.high;
  const low = req.body.low;

  connection.query(
    `INSERT INTO stock_data (stock_id, current_price, \`change\`, percentage_change, \`open\`, high, low) 
    VALUES ('${stock_id}', ${current_price}, ${change}, ${percentage_change}, ${open}, ${high}, ${low}) 
    ON DUPLICATE KEY UPDATE
      current_price = VALUES(current_price),
      \`change\` = ${change},
      percentage_change = ${percentage_change},
      \`open\` = ${open},
      high = ${high},
      low = ${low};`,
    async (err, data, fields) => {
      if (err) {
        console.log(err);
        console.log("Error while inserting stock data");
        res.json({
          success: false,
          msg: "Error while inserting stock data",
        });
      } else {
        res.json({
          success: true,
          StockId: stock_id,
        });
      }
    }
  );
};

// add company Data to DB
const addCompanyData = async (req, res) => {
  const country = req.body.country;
  const currency = req.body.currency;
  const estimate_currency = req.body.estimate_currency;
  const exchange = req.body.exchange;
  const finnhubIndustry = req.body.finnhubIndustry;
  const ipo = req.body.ipo;
  const logo = req.body.logo;
  const market_capitalization = req.body.market_capitalization;
  const name = req.body.name;
  const phone = req.body.phone;
  const share_outstanding = req.body.share_outstanding;
  const ticker = req.body.ticker;
  const weburl = req.body.weburl;

  connection.query(
    `INSERT INTO company_data (country, currency, estimate_currency, exchange, finnhubIndustry, ipo, logo, market_capitalization, name, phone, share_outstanding, ticker, weburl) VALUES ('${country}', '${currency}', '${estimate_currency}', '${exchange}', '${finnhubIndustry}', ${ipo}, '${logo}', ${market_capitalization}, '${name}', ${phone}, ${share_outstanding}, '${ticker}', '${weburl}') ON DUPLICATE KEY UPDATE
    country = VALUES(country),
    currency = VALUES(currency),
    estimate_currency = VALUES(estimate_currency),
    exchange = VALUES(exchange),
    finnhubIndustry = VALUES(finnhubIndustry),
    ipo = VALUES(ipo),
    logo = VALUES(logo),
    market_capitalization = VALUES(market_capitalization),
    name = VALUES(name),
    phone = VALUES(phone),
    share_outstanding = VALUES(share_outstanding),
    weburl = VALUES(weburl)`,
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
          companyId: ticker,
        });
      }
    }
  );
};

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

// getting all watch list records against a watchlist ID
const getAllWatchListRecords = async (req, res) => {
  const watchlist_id = req.body.watchlist_id;

  connection.query(
    `SELECT * FROM watchlist_stocks WHERE watchlist_id = '${watchlist_id}'`,
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
      }
    }
  );
};

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

const removeStock = async (req, res) => {
  const stockID = req.params.stockID;
  console.log("stockID", stockID);
  console.log(
    "query: ",
    `DELETE FROM watchlist_stocks WHERE stock_id like '${stockID}';`
  );
  connection.query(
    `DELETE FROM watchlist_stocks WHERE stock_id like '${stockID}';`,
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
          msg: "No stocks found for the watchlist",
        });
      } else {
        res.json({
          success: false,
          msg: "sucessfully deleted stock",
        });
      }
    }
  );
};

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
  addAStockIntoDB,
  addCompanyData,
  addWatchListRecord,
  getAllWatchListRecords,
  getWatchListStocks,
  removeStock,
  removeWatchlist,
};
