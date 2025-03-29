import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>UDBHAVA</h2>
      <div className="profile">
        <span>👤 User</span>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
