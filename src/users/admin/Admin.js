//import { Button } from "../Buttons/Buttons";
import React, { Component } from "react";

import { MenuItems } from "./MenuItems-admin";
import { NavLink } from "react-router-dom";
import logo from "../../assets/PPS5.jpeg";
import "./admin.css";
//import {image} from "./images";
//import { TextField } from "@material-ui/core";

const Admin = () => {
    return (
      <React.Fragment>

<nav className="NavbarItems-admin">
        
<NavLink to="/admin" >
                  
        <img className="logo-admin" src={logo} alt="Logo" />

</NavLink>
        <h1 className="navbar-logo-admin">Admin's Portal</h1>

        <ul className="nav-menu-admin ">
          {MenuItems.map((item, index) => {
            return (
              <div className="nav-links-admin" key={index}>
                <li>
                  <NavLink to={item.url} className={item.cName}>
                    {" "}
                    {item.title}
                  </NavLink>
                  {/* <a className={item.cName} href={item.url}>
                      {item.title}
                    </a> */}
                </li>
              </div>
            );
          })}
        </ul>
        <NavLink to="/#" > <button className="button-admin">Log out</button>
        </NavLink> 
        
      </nav>


        {/* <nav className="NavbarItems">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="navbar-logo">Admin's Portal</h1> */}

          {/* <div className="menu-icon"></div> */}

          {/* <ul className="nav-menu ">
            {MenuItems.map((item, index) => {
              return (
                <div className="nav-links" key={index}>
                  <li>
                    <NavLink to={item.url} className={item.cName}>
                      {" "}
                      {item.title}
                    </NavLink>
                  </li>
                </div>
              );
            })}
          </ul>
          <NavLink to="/addword" > <button className="button-admin">Log out</button></NavLink>
        </nav> */}
        <div className="admin-body"> Welcome Admin</div>
      </React.Fragment>
    );
  
}
export default Admin;
