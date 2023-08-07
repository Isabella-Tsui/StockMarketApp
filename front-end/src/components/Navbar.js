import React, { useState } from "react";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Button } from "antd";
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
              <div className="logout">
                <Button
                  type="primary"
                  style={{
                    margin: "0px 16px",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
                    backgroundColor: "#f5f5f5",
                    color: "#000000",
                    borderColor: "#f5f5f5",
                  }}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    Logout
                  </div>
                </Button>
              </div>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="x-out">
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
