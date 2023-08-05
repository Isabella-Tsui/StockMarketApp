import React, { useState } from "react";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

//This file contains the component that renders the
//navigation bar.

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  const navigate = useNavigate();

  // Function Name: showSidebar
  // Purpose: Determines when to display the side bar
  // Parameters: None

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  // Function Name: handleLogout
  // Purpose: Destorys the "session"
  // Parameters: None

  const handleLogout = async () => {
    sessionStorage.setItem("isAuthenticated", "false");
    sessionStorage.setItem("userID", "");
    setLogoutStatus(true);
    navigate("/login");
  };

  //Returns the side bar and the top menu
  return (
    <>
      {logoutStatus ? null : (
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav>
            <div className="navbar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                <div className="sideBarr">
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.className}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </nav>
          </nav>
        </IconContext.Provider>
      )}
    </>
  );
}

export default Navbar;
