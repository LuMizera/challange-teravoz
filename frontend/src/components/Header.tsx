import React from "react";
import TeravozLogo from "../assets/images/teravoz-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-background">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src={TeravozLogo} width="80" height="50" />
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <h3> Hello user</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
