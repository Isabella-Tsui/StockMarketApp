import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import WishList from "./pages/WatchList.js";
import WatchList from "./pages/WishList.js";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

// This component establishes all the routes a user can take
// within the web App.

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   () => sessionStorage.getItem("isAuthenticated") === "true"
  // );

  // console.log(isAuthenticated);

  // useEffect(() => {
  //   console.log("isAuthenticated:", isAuthenticated);
  // }, [isAuthenticated]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("isAuthenticated") === "true"
  );

  console.log(isAuthenticated);

  useEffect(() => {
    // Update the isAuthenticated state whenever sessionStorage changes
    setIsAuthenticated(sessionStorage.getItem("isAuthenticated") === "true");
  }, []);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home isAuthenticated={isAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<RegistrationPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/wishlist/:id"
          element={<WishList isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/watchList"
          element={<WatchList isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
