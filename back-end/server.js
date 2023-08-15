const connection = require("./database/databaseConnection.js");
const { login, register } = require("./authentication");
const {
  getWatchList,
  addWatchList,
  addWatchListRecord,
  getAllWatchListRecords,
  removeWatchlist,
} = require("./watchList");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const {
  addAStockIntoDB,
  addCompanyData,
  removeStock,
} = require("./watchListStocks.js");

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  connection
);

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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

connection.connect();

app.get("/", (req, res) => {
  res.send("Server is healthy.");
});

// Authentication endpoints
app.post("/login", login);
app.post("/register", register);

//Insertion endpoints
app.get("/getwatchlist/:username", getWatchList);
app.post("/addwatchlist", addWatchList);
app.post("/addStock", addAStockIntoDB);
app.post("/addCompany", addCompanyData);
app.post("/addWatchListRecord", addWatchListRecord);
app.get("/getAllWatchListRecords/:id", getAllWatchListRecords);

//Removal endpoints
app.delete("/removeStock/:stockID", removeStock);
app.delete("/removeWatchlist/:watchlistId", removeWatchlist);

// NOTE: all api endpoints must be ABOVE this call
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
