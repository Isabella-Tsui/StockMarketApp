import { useState, useEffect } from "react";
import "./App.css";
import config from "./config";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Trending from "./pages/Trending";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  // const getCurrentUsers = () => {
  //   // Make a GET request to backend at members endpoint
  //   fetch(`${config.app.host}members`)
  //     // extract text from the reponse
  //     .then((response) => response.text())
  //     .then((response) => JSON.parse(response))
  //     .then((data) => setUsers(data));
  // };

  // // get current users on initial render only
  // useEffect(() => getCurrentUsers(), []);

  // const displayUsers = () => {
  //   return users.map((user) => <li>{user.first_name}</li>);
  // };

  /* 
    Comment this version of displayUsers once you start using the version above
    This version of the method was created to ensure the App renders without errors
  */
  // const displayUsers = () => {
  //   let mock_users = ["Emily", "Hannah", "Addie", "Isabella", "Anthony"];
  //   return mock_users.map((user) => <li>{user}</li>);
  // };

  // return (
  //   <div className="App">
  //     <h1>TEMPLATE APP</h1>
  //     <div className="container">
  //       <p>Mock Processed Get Request:</p>
  //       <ul>{displayUsers()}</ul>
  //     </div>
  //   </div>
  // );
  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;
