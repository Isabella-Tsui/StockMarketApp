// import React, { useState } from "react";
// import "./Navbar.css";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
// import { IconContext } from "react-icons";

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);
//   const [logoutStatus, setLogoutStatus] = useState(false);
//   const navigate = useNavigate();

//   const showSidebar = () => {
//     setSidebar(!sidebar);
//   };

//   const handleLogout = async () => {
//     sessionStorage.setItem("isAuthenticated", "false");
//     sessionStorage.setItem("userID", "");
//     navigate("/login");

//     // try {
//     //   const response = await fetch("http://localhost:4000/logout", {
//     //     method: "POST",
//     //     credentials: "include", // Include credentials (cookies) in the request
//     //   });

//     //   if (response.success) {
//     //     setLogoutStatus(true);
//     //     sessionStorage.setItem("isAuthenticated", "false");
//     //     sessionStorage.setItem("userID", "");
//     //     navigate("/login");
//     //   } else {
//     //     setLogoutStatus(false);
//     //     setLogoutError("Logout failed. Please try again.");
//     //   }
//     // } catch (error) {
//     //   console.error("Error during logout:", error);
//     //   setLogoutStatus(false);
//     //   setLogoutError("An error occurred during logout. Please try again.");
//     // }
//   };

//   return (
//     <>
//       <IconContext.Provider value={{ color: "#fff" }}>
//         <nav>
//           <div className="navbar">
//             <Link to="#" className="menu-bars">
//               <FaIcons.FaBars onClick={showSidebar} />
//             </Link>
//             <button onClick={handleLogout}>Logout</button>
//           </div>

//           <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//             <ul className="nav-menu-items" onClick={showSidebar}>
//               <li className="navbar-toggle">
//                 <Link to="#" className="menu-bars">
//                   <AiIcons.AiOutlineClose />
//                 </Link>
//               </li>
//               <div className="sideBarr">
//                 {SidebarData.map((item, index) => {
//                   return (
//                     <li key={index} className={item.className}>
//                       <Link to={item.path}>
//                         {item.icon}
//                         <span>{item.title}</span>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </div>
//             </ul>
//           </nav>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = async () => {
    sessionStorage.setItem("isAuthenticated", "false");
    sessionStorage.setItem("userID", "");
    setLogoutStatus(true);
    navigate("/login");
  };

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
