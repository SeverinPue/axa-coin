import React from "react";
import "./stylesheets/navbar.css";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <>
      <nav className="navBar">
        <div className="logo">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <ul className="navList">
          <li><a href="#">Home</a></li>
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Shop</a></li>
        </ul>
      </nav>
    </>
  );
}
