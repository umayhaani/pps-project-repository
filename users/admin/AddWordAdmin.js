import React, { useState } from "react";
import Modal from "react-modal";
import useForm from "../../../src/utils/useForm";
import { TextField } from "@material-ui/core";
import "../../../src/modal.css";
import "./addWordAdmin.css";
Modal.setAppElement("#root");
const AddWordAdmin = () => {
  const [modalisOpen, setModalisOPen] = useState(() => true);
  const [level, setLevel] = useState(() => "");
  const [grade, setGrade] = useState(() => "");
  const [inputValue, handleChangeForInputs] = useForm();

  const addHandler = async (e) => {
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
      if (responseData) {
        console.log(responseData.result.spell);
      }
      // console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newWord">
      {" "}
      <Modal
        isOpen={modalisOpen}
        // onRequestClose={setModalisOPen(() => false)}
        style={{
          content: {
            color: "crimson",
            width: "500px",
            height: "300px",
            marginLeft: "20rem",
            marginTop: "8rem",
            textAlign: "center",
            boxShadow: "0 5px 8px #f5f5f5",
            fontWeight: "bolder",
          },
        }}
      >
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
            {<option>Select Grade</option>}
            <option value="Grade-1">Grade-1</option>
            <option value="Grade-2">Grade-2</option>
            <option value="Grade-3">Grade-3</option>
            <option value="Grade-4">Grade-4</option>
            <option value="Grade-5">Grade-5</option>
          </select>

          <select id="Level" onChange={(e) => setLevel(e.target.value)}>
            {<option>Select Level</option>}
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <button className="addBtn" onClick={addHandler}>
            ADD
          </button>{" "}
        </div>
      </Modal>
    </div>
  );
};

export default AddWordAdmin;
