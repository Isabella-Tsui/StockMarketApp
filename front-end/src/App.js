import { useState, useEffect } from "react";
import "./App.css";
import config from "./config";

function App() {
  const [users, setUsers] = useState([]);

  /*
    Uncomment lines 12-25 once you've configured your backend/server.js file
  */

  const getCurrentUsers = () => {
    // Make a GET request to backend at members endpoint
    fetch(`${config.app.host}members`)
      // extract text from the reponse
      .then((response) => response.text())
      .then((response) => JSON.parse(response))
      .then((data) => setUsers(data));
  };

  // get current users on initial render only
  useEffect(() => getCurrentUsers(), []);

  const displayUsers = () => {
    return users.map((user) => <li>{user.first_name}</li>);
  };

  /* 
    Comment this version of displayUsers once you start using the version above
    This version of the method was created to ensure the App renders without errors
  */
  // const displayUsers = () =>{
  //   let mock_users = ["Emily", "Hannah", "Addie", "Isabella", "Anthony"]
  //   return mock_users.map((user) => <li>{user}</li>)
  // }

  return (
    <div className="App">
      <h1>TEMPLATE APP</h1>
      <div className="container">
        <p>Mock Processed Get Request:</p>
        <ul>{displayUsers()}</ul>
      </div>
    </div>
  );
}

export default App;
