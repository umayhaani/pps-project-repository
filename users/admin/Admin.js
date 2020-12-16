//import { Button } from "../Buttons/Buttons";
import React, { Component } from "react";

import { MenuItems } from "./MenuItems-admin";
import { NavLink } from "react-router-dom";
import logo from "../../assets/PPS5.jpeg";
import "./admin.css";
//import {image} from "./images";
//import { TextField } from "@material-ui/core";

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="NavbarItems">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="navbar-logo">Admin's Portal</h1>

          <div className="menu-icon"></div>

          <ul className="nav-menu ">
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
          <button className="button-admin">Log out</button>
        </nav>
        <div className="admin-body"> Welcome Admin</div>
      </React.Fragment>
    );
  }
}
export default Admin;
