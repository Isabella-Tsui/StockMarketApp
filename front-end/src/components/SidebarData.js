import React from "react";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    className: "nav-text",
  },
  {
    title: "Trending",
    path: "/trending",
    icon: <HiIcons.HiTrendingUp />,
    className: "nav-text",
  },
  {
    title: "Watchlist",
    path: "/watchlist",
    icon: <PiIcons.PiBinocularsBold />,
    className: "nav-text",
  },
];
