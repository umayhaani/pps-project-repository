import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../assets/PPS5.jpeg";
import bee1 from "../assets/bee1.JPG";
import "./spellLevel.css";

export let level;

const SpellLevel = () => {
  const history = useHistory();
  const navigateTo = (e) => {
    history.push("/SpeechToText");
    level = e.target.innerText;
    console.log(level);
  };
  return (
    <React.Fragment>
      <nav className="NavbarItems-Level">
        <img className="logo" src={logo} alt="Logo-Level" />
        <h1 className="navbar-logo-Level">Spell Bee</h1>
        <ul className="nav-menu-Level ">
          <div className="nav-links-Level">
            <li>
              <NavLink to="/Home" className="nav-links">
                Home
              </NavLink>
            </li>
          </div>
          <div className="nav-links-Level">
            <li>
              <NavLink to="Spellings" className="nav-links">
                Spellings
              </NavLink>
            </li>
          </div>
          <div className="nav-links-Level">
            <li>
              <NavLink to="Vocabulary" className="nav-links-Level">
                Vocabulary
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>

      {/* <img className="background" src={background} alt="background" /> */}

      <div className="outer-div-Level">
        <div>
          {" "}
          <img className="bee1-Level" src={bee1} alt="bee" />
        </div>
        <div className="white-div-Level">
          <div className="spell-title-Level">
            {" "}
            <p>Select Level</p>{" "}
          </div>

          {/* <img className="spell-title" src={spelltitle} alt="Select level" /> */}
          <div>
            <button className="button1-Level" onClick={navigateTo}>
              Beginner
            </button>
            <br></br>
            <button className="button-Level">Intermediate</button>
            <br></br>
            <button className="button1-Level">Advanced</button>
            <br></br>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpellLevel;
