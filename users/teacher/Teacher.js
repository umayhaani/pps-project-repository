import React, { Component } from "react";
import { MenuItems } from "./MenuItems-teacher";
import { userName } from "../../Auth";
import { NavLink } from "react-router-dom";
import logo from "../../assets/PPS5.jpeg";
import "./teacher.css";
//import "./auth.css";
//import {image} from "./images";
//import { TextField } from "@material-ui/core";

class Teacher extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="NavbarItems-teacher">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="navbar-logo-teacher">{userName}</h1>

          <ul className="nav-menu-teacher ">
            {MenuItems.map((item, index) => {
              return (
                <div className="nav-links-teacher" key={index}>
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
          <button className="button-teacher"> Log out</button>
        </nav>

        <div className="all-divs">
          <div className="body-div">
            <p className="text-teacher">Lecture Notes </p>
            <div className="button-div">
              <button className="button-teacher">Go</button>
            </div>
          </div>

          <div className="body-div">
            <p className="text-teacher">Video Lectures </p>
            <div className="button-div">
              <button className="button-teacher">Go</button>
            </div>
          </div>

          <div className="body-div">
            <p className="text-teacher">Worksheets </p>
            <div className="button-div">
              <button className="button-teacher">Go</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Teacher;
