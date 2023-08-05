import React from "react";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";

//This file contains the component which handles
//the menu navigation

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    className: "nav-text",
  },
  {
    title: "Watchlist",
    path: "/watchlist",
    icon: <PiIcons.PiBinocularsBold />,
    className: "nav-text",
  },
];
