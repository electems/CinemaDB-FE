import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class UserHeader extends Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            CinimaDB
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User 
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/form"} className="nav-link">
                  Form
                </Link>
              </li>
          </div>
        </nav>
      </div>
     );
  }
}

export default UserHeader;
