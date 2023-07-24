import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import WishList from './pages/WishList'
import WatchList from './pages/WatchList.js'
import Trending from './pages/Trending'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  )

  console.log(isAuthenticated)

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated)
  }, [isAuthenticated])

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Home isAuthenticated={isAuthenticated} />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/login'
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/register'
          element={<RegistrationPage isAuthenticated={isAuthenticated} />}
        />

        <Route
          path='/wishList'
          element={<WishList isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/watchList'
          element={<WatchList isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/trending'
          element={<Trending isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  )
}

export default App
