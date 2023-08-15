const bcrypt = require("bcrypt");
const connection = require("./database/databaseConnection.js");

//This file contains all the functions that make
//queries to the database

// Function Name: login
// Purpose: Validate a user
// Parameters: req, res

const login = async (req, res) => {
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
          req.session.userId = data[0].id;
          res.json({
            success: true,
            username: data[0].username,
          });

          return;
        } else {
          res.json({
            success: false,
            msg: "Invalid password",
          });
        }
      } else {
        res.json({
          success: false,
          msg: "User not found, please try again",
        });
      }
    }
  );
};

// Function Name: register
// Purpose: Add a user to the database
// Parameters: req, res

const register = async (req, res) => {
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
      if (err) {
        res.json({
          success: false,
          msg: "An error when checking if a user alraedy exists in the database",
        });
        return;
      } else {
        //No error has occured when checking, see if user exists
        const numUsersWithThisUsername = data[0].numUsersWithThisUsername;

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
                res.json({
                  success: false,
                  msg: "An error has occurred inserting user into the database, please try again",
                });
                return;
              } else {
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
};

module.exports = {
  login,
  register,
};
