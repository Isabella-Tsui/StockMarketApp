const bcrypt = require("bcrypt"); //Added
const session = require("express-session"); //Added
const MySQLStore = require("express-mysql-session")(session); //Added
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "stockmarketapp.cqiv4llmmhyd.ca-central-1.rds.amazonaws.com",
  user: "itsui",
  password: "$Cherry7",
  database: "stockMarketApp",
});

//Added
const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  connection
);

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

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username.length > 30) {
    res.json({
      success: false,
      msg: "An error has occurred, please try again",
    });
    return;
  }

  let currUser = [username];
  connection.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    currUser,
    async (err, data, fields) => {
      if (err) {
        console.log("got to err msg");
        res.json({
          success: false,
          msg: "An error has occurred, please try again",
        });
        return;
      }

      if (data && data.length === 1) {
        const passwordMatches = await bcrypt.compare(
          password,
          data[0].password
        );

        if (password === data[0].password) {
          console.log("password matches");
          req.session.userId = data[0].id;
          res.json({
            success: true,
            username: data[0].username,
          });

          return;
        } else {
          console.log("password dosen't match");
          res.json({
            success: false,
            msg: "Invalid password",
          });
        }
      } else {
        console.log("couldn't find");
        res.json({
          success: false,
          msg: "User not found, please try again",
        });
      }
    }
  );
});

app.post("/register", async (req, res) => {
  console.log("did we even get in?????");
  let inputUsername = req.body.username;
  let inputPassword = req.body.password;
  let inputName = req.body.name;

  if (inputUsername.length > 30 || inputPassword.length > 30) {
    res.json({
      success: false,
      msg: "Password and username cannot be greater than 30 charachters long",
    });
    return;
  }

  //Check if user exists already
  let currUser = [inputUsername];
  connection.query(
    "SELECT COUNT(*) AS numUsersWithThisUsername FROM users WHERE username = ?",
    currUser,
    async (err, data, fields) => {
      console.log("we made a query");
      console.log("this is the data packet: ", data);
      if (err) {
        console.log("got to err msg");
        res.json({
          success: false,
          msg: "An error when checking if a user alraedy exists in the database",
        });
        return;
      } else {
        //No error has occured when checking, see if user exists
        console.log("No error has occured we are checking if they exist");
        const numUsersWithThisUsername = data[0].numUsersWithThisUsername;
        console.log(
          "data[0].numUsersWithThisUsername: ",
          data[0].numUsersWithThisUsername
        );
        if (numUsersWithThisUsername > 0) {
          res.json({
            success: false,
            msg: "This username is already taken, please choose another username",
          });
        } else {
          //User does not exist it is okay to add their information to the database
          connection.query(
            `INSERT INTO users (username, password, firstName) VALUES('${inputUsername}', '${inputPassword}', '${inputName}' )`,
            async (err, data, fields) => {
              if (err) {
                console.log("got to err msg");
                res.json({
                  success: false,
                  msg: "An error has occurred inserting user into the database, please try again",
                });
                return;
              } else {
                console.log("got to err msg");
                res.json({
                  success: true,
                  msg: "User was sucessfully inserted into the database",
                });
              }
            }
          );
        }
      }
    }
  );
});

//Added
app.post("/logout", (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
    res.json({
      success: true,
    });
    return true;
  } else {
    res.json({
      success: false,
    });
  }
});

// NOTE: all api endpoints must be ABOVE this call
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
