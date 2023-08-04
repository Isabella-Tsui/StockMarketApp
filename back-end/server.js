const connection = require("./db/db.js"); //Added
const { login, register, logout } = require("./authentication"); //auth
const { getWatchList, addWatchList } = require("./watchList"); //watchList
const {
  addAStockIntoDB,
  addCompanyData,
  addWatchListRecord,
  getAllWatchListRecords,
  getWatchListStocks,
  removeStock,
  removeWatchlist,
} = require("./watchListStocks.js");

const bcrypt = require("bcrypt"); //Added
const session = require("express-session"); //Added
const MySQLStore = require("express-mysql-session")(session); //Added
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

//Added
const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  connection
);

const app = express();

const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace this with the URL of your frontend app
    credentials: true, // Allow credentials (cookies, in this case)
  })
);

//Added stuff inside cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect();

//Added //LOOK AT THIS
app.use(
  session({
    key: "asdf",
    secret: "asfd",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false,
      sameSite: "None",
      secure: true,
    },
  })
);

// Authentication
app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

// Inserting stock data
app.get("/getwatchlist/:username", getWatchList);
app.post("/addwatchlist", addWatchList);
app.post("/addStock", addAStockIntoDB);
app.post("/addCompany", addCompanyData);
app.post("/addWatchListRecord", addWatchListRecord);
app.get("/getAllWatchListRecords", getAllWatchListRecords);
app.get("/getWatchListStocks/:watchlistId", getWatchListStocks);

//Removing stock and watchlist data
app.delete("/removeStock/:stockID", removeStock);
app.delete("/removeWatchlist/:watchlistId", removeWatchlist);

// NOTE: all api endpoints must be ABOVE this call
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
