import React from "react";
import "./student.css";
import { MenuItems } from "./MenuItems-student";
import logo from "../../assets/PPS5.jpeg";
import { NavLink } from "react-router-dom";
import bow from "../../assets/bow.jpeg";

const Student = () => {
  return (
    <React.Fragment>
      <nav className="NavbarItems-student">
        <img className="logo-stu" src={logo} alt="Logo" />
        <h1 className="navbar-logo-student">Student's Portal</h1>

        <ul className="nav-menu-student ">
          {MenuItems.map((item, index) => {
            return (
              <div className="nav-links-student" key={index}>
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
        <button className="button-student"> Log out</button>
      </nav>

      <div className="outerDiv_Student">
        <div className="all-divs">
          <NavLink to="/admin">
            <div className="body-div">
              <p className="text-student">Grade- 1 </p>
              {/* <div className="button-div">
                <button className="button-student">Go</button>
              </div> */}
            </div>
          </NavLink>

          <div className="body-div">
            <p className="text-student">Grade-2 </p>
            <div className="button-div">
              <button className="button-student">Go</button>
            </div>
          </div>

          <div className="body-div">
            <p className="text-student">Grade-3</p>
            <div className="button-div">
              <button className="button-student">Go</button>
            </div>
          </div>

          <div className="body-div">
            <p className="text-student">Grade-4</p>
            <div className="button-div">
              <button className="button-student">Go</button>
            </div>
          </div>

          <div className="body-div">
            <p className="text-student">Grade-5</p>
            <div className="button-div">
              <button className="button-student">Go</button>
            </div>
          </div>
        </div>
        <img className="bow" src={bow} alt="bow" />
      </div>
    </React.Fragment>
  );
};

export default Student;
