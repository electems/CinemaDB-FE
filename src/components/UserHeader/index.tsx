import React, { Component } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserHeader=()=>  {
  const navigate = useNavigate();

  function logout () {
    localStorage.removeItem('@cinimaDb:Token');
    localStorage.removeItem('authuser');
    navigate("/admin/login");
    
  };

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            CinemaDB
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
             
              <li className="text-right">
                <button id="logout" type="submit" className="btn btn-danger pull-right" onClick={logout} >Logout</button>
                 </li>
          </div>
        </nav>
      </div>
      
     );
  }


export default UserHeader;
