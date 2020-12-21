import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../assets/PPS5.jpeg";
import title from "../assets/spell-title1.jpg";
import letter1 from "../assets/letter1.jpg";
import letter2 from "../assets/letter2.jpg";
import letter3 from "../assets/letter3.jpg";
import letter4 from "../assets/letter4.jpg";
import letter5 from "../assets/letter5.jpg";
import "./mainPage.css";

export let grade;

const MainPage = (props) => {
  const history = useHistory();

  const navigateTo = (e) => {
    history.push("/SpellBee/SpellLevel");
    // console.log(`spechContext ${SpellContext.value}`);
    grade = e.target.innerText;
    console.log(grade);
  };
  return (
    <>
      <nav className="NavbarItems">
      <NavLink to="/Student" >
                  
                  <img className="logo" src={logo} alt="Logo" />
          
          </NavLink>
        <h1 className="navbar-logo">Spell Bee</h1>
        <ul className="nav-menu ">
          {/* {MenuItems.map((item, index)=> { */}
          {/* return ( */}
          {/* <div className="nav-links">
            <li>
              <NavLink to="/Student/SpellBee" className="nav-links">
                Home
              </NavLink>
            </li>
          </div> */}

          <div className="nav-links-Level">
            <li>
              <NavLink to="/Student" className="nav-links">
                Home
              </NavLink>
            </li>
          </div>
          {/* <div className="nav-links">
            <li>
              <NavLink to="Spellings" className="nav-links">
                Spellings
              </NavLink>
            </li>
          </div>
          <div className="nav-links">
            <li>
              <NavLink to="Vocabulary" className="nav-links">
                Vocabulary
              </NavLink>
            </li>
          </div> */}
        </ul>
      </nav>

      <div className="outer-div">
        <div className="white-div">
          <div>
            <img className="spell-title" src={title} alt="Spell Bee" />
            <button className="button" onClick={navigateTo} type="button">
              {" "}
              Grade-1
            </button>
            <br></br>
            <button className="button" onClick={navigateTo} type="button">
              {" "}
              Grade-2
            </button>
            <br></br>
            <button className="button" onClick={navigateTo} type="button">
              {" "}
              Grade-3
            </button>
            <br></br>
            <button className="button" onClick={navigateTo} type="button">
              {" "}
              Grade-4
            </button>
            <br></br>
            <button className="button" onClick={navigateTo} type="button">
              {" "}
              Grade-5
            </button>
          </div>
        </div>
        <div>
          {" "}
          <img className="letter1" src={letter1} alt="S" />
        </div>
        <div>
          {" "}
          <img className="letter2" src={letter2} alt="L" />
        </div>
        <div>
          {" "}
          <img className="letter3" src={letter3} alt="Y" />
        </div>
        <div>
          {" "}
          <img className="letter4" src={letter4} alt="P" />
        </div>
        <div>
          {" "}
          <img className="letter5" src={letter5} alt="B" />
        </div>
      </div>
    </>
  );
};

export default MainPage;
