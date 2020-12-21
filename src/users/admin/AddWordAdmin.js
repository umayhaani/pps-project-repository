import React, { useState } from "react";
import useForm from "../../../src/utils/useForm";
import { MenuItems } from "./MenuItems-admin";
import { NavLink } from "react-router-dom";
import logo from "../../assets/PPS5.jpeg";
import { TextField } from "@material-ui/core";
import Modal from "../../modal";
import ErrorModal from "../../ErrorModal";
import "./addWordAdmin.css";

const AddWordAdmin = () => {
  const [level, setLevel] = useState(() => "");
  const [grade, setGrade] = useState(() => "");
  const [error, setError] = useState(""); //backend
  const [open, setOpen] = useState(() => false);
  const [errModal, seterrModal] = useState(() => false);
  const [err, setErr] = useState(() => false);
  const [modalShow, setModalShow] = useState(() => true);
  const [inputValue, handleChangeForInputs, clear] = useForm();

  const addHandler = async (e) => {
    clear();
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/admin/addWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spell: inputValue.adminWord,
          description: inputValue.adminDescription,
          grade: grade,
          level: level,
        }),
      });

      const responseData = await response.json();
      if (responseData.result) {
        console.log(responseData.result.spell);
       
        setErr(() => false);
        setOpen(() => true);
      }
      if (responseData.err) {
        console.log(responseData.err);
        setErr(() => true);
        seterrModal(() => true);
        setOpen(() => false);
      }
      // console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

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
    
    
    <div id="addWordBackground">
      <div className="addWordcontainer">
        <div className="addWordBox">
          <form>
            <TextField
              type="text"
              name="adminWord"
              label="Enter word"
              value={inputValue.adminWord || ""}
              onChange={handleChangeForInputs}
            />
            <br />
            <TextField
              type="text"
              name="adminDescription"
              label="Enter description"
              value={inputValue.adminDescription || ""}
              onChange={handleChangeForInputs}
            />
            <div className="dropDown">
              <select id="Grade" onChange={(e) => setGrade(e.target.value)}>
                <option value="grade">Select Grade</option>
                <option value="Grade-1">Grade-1</option>
                <option value="Grade-2">Grade-2</option>
                <option value="Grade-4">Grade-4</option>
                <option value="Grade-5">Grade-5</option>
              </select>
              <select id="Level" onChange={(e) => setLevel(e.target.value)}>
                <option value="level">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </form>
          <button className="addBtn" onClick={addHandler}>
            ADD
          </button>{" "}
          {err ? (
            <ErrorModal
              modalShow
              modalisOpen={errModal}
              error={error}
              closeModal={() => seterrModal(false)}
            ></ErrorModal>
          ) : (
            <Modal
              modalisOpen={open}
              modalShow
              closeModal={() => setOpen(false)}
            ></Modal>
          )}
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default AddWordAdmin;