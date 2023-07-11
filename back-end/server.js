const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");

/*          ---STEP 0 from the README file---
    Enter your specific database information on lines 23-26.
    This information will be found on your AWS account
    As an example:
    host: 'xxxxxxxx.us-west-2.rds.amazonaws.com',
    user: 'billy_the_programmer',
    password: 'programming_rules',
    database: 'cool_database_name'
*/
// const connection = mysql.createConnection({
//     host: 'xxxxxxxx.us-west-2.rds.amazonaws.com',
//     user: '<your_username>',
//     password: '<your_password>',
//     database: '<your_database_name>'
// })

const connection = mysql.createConnection({
  host: "stockmarketapp.cqiv4llmmhyd.ca-central-1.rds.amazonaws.com",
  user: "itsui",
  password: "$Cherry7",
  database: "stockMarketApp",
});

const app = express();
/*
    This is the port number for your backend.
    If you change this number, you must also change it in your 
    front-end's src/config/index.js file
*/
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect();

/*
    Here is an example get request to an endpoint called members.
    You can use it as a starting point for your own database.
    That being said, you will likely need to change the query 
    unless your database also contains a table called users with 
    the a column called first_name.

    Once you have added your database credentials on lines 16-19
    you can uncomment lines 47-57 alter the query
    to work with your database

    If you want the corresponding front-end to work, I recommend
    a query that returns one column of data.
    Ex: SELECT <column_name> FROM <table_name>
*/

app.get("/members", (req, res) => {
  connection.query(
    "SELECT first_name FROM users ORDER BY first_name ASC",
    (err, rows) => {
      if (err) throw err;
      let response = [];
      for (let row of rows) {
        response.push({ first_name: row.first_name });
      }
      // This reponse (i.e. data returned from the query) gets sent back to the front-end
      res.send(response);
    }
  );
});

// NOTE: all api endpoints must be ABOVE this call
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
