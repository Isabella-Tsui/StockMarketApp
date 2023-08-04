const connection = require("./db/db.js");

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

module.exports = { getWatchList, addWatchList };
