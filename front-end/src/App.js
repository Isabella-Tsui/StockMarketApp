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
import SearchPage from "./pages/SearchPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
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
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={<RegistrationPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/searchPage"
          element={<SearchPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/watchlist"
          element={<Watchlist isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/trending"
          element={<Trending isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
