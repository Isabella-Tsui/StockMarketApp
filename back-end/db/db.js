const mysql = require("mysql");

connection = mysql.createConnection({
  host: "stockmarketapp.cqiv4llmmhyd.ca-central-1.rds.amazonaws.com",
  user: "itsui",
  password: "$Cherry7",
  database: "stockMarketApp",
});

module.exports = connection;
