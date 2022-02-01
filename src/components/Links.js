import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "🔎 All" },
  { url: "/news", text: "📰 News" },
  { url: "/images", text: "📸 Images" },
  { url: "/videos", text: "📺 Videos" },
];

const Links = () => (
  <div className="flex sm:justify-around justify-between items-center mt-4">
    {links.map(({ url, text, id }) => (
      <NavLink
        to={url}
        lassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
        key={id}
      >
        {text}
      </NavLink>
    ))}
  </div>
);

export default Links;

// <NavLink to="/home" className={({isActive}) => (isActive ? "active-style" : 'none')}>Home</NavLink>
