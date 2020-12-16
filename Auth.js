import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "./utils/useForm";
import GoogleLogin from "react-google-login";
import ModalWin from "./modal";
import ErrorModal from "./ErrorModal";
import "./auth.css";
import { TextField } from "@material-ui/core";

export let userName;

const Auth = () => {
  const [inputValue, handleChangeForInputs] = useForm();
  const [isLoginMode, setLoginMode] = useState(true);
  const [err, setErr] = useState(false); //for frontend error
  const [role, setRole] = useState("");
  const [modalisOpen, setModalisOPen] = useState(false);
  const [errModal, seterrModal] = useState(false);
  const [error, setError] = useState(""); //for backend error
  const history = useHistory();

  useEffect(() => {
    setError(error);
  }, [error]);

  const switchModeHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      if (inputValue.password === undefined || inputValue.email === undefined) {
        setErr(true);
      }
    }
    if (!isLoginMode) {
      if (
        inputValue.name === undefined ||
        inputValue.password === undefined ||
        inputValue.email === undefined
      ) {
        setErr(true);
      }
      if (
        (inputValue.name || inputValue.password) &&
        inputValue.email &&
        role !== "Select Role"
      ) {
        setErr(false);
        if (!isLoginMode) {
          setModalisOPen(true);
        }
      }
    }

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputValue.email,
            password: inputValue.password,
          }),
        });
        const responseData = await response.json();
        if (responseData.status) {
          seterrModal(true);
          setError(() => responseData.err);
        }

        // if (!responseData.ok) {
        //   seterrModal(true);
        // }

        if (responseData.role === "Admin") {
          history.push("/admin");
          console.log(responseData.role);
        }
        if (responseData.role === "Teacher") {
          userName = responseData.name;
          history.push("/teacher");
        }
        if (responseData.role === "Student") {
          history.push("/student");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputValue.name,
            email: inputValue.email,
            password: inputValue.password,
            role: role,
          }),
        });

        const responseData = await response.json();
        if (responseData.status !== "201") {
          seterrModal(true);
          setError(() => responseData.err);
        }
        // console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const responseSuccessGoogle = async (response) => {
    // console.log(response);
    const email = response.profileObj.email; //from google

    //console.log(email);

    try {
      const response = await fetch("http://localhost:5000/gmailLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const responseData = await response.json();
      // console.log(responseData.role);
      if (responseData.status) {
        seterrModal(true);
        setError(() => responseData.err);
      }
      if (responseData.role === "Teacher") {
        userName = responseData.name;
        history.push("/teacher");
      }
      if (responseData.role === "Student") {
        history.push("/student");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const responseErrorGoogle = () => {
    console.log("failed to connect");
  };

  return (
    <div className="outerDiv">
      <div className="card">
        <form className="text" onSubmit={submitHandler}>
          <h2 style={{ marginTop: "2rem" }}>
            {isLoginMode ? "LOGIN REQUIRED" : "SIGN-UP REQUIRED"}
          </h2>
          <hr />
          <br></br>
          <br></br>
          {err && (
            <span
              style={{ color: "red", fontWeight: "bold", marginTop: "0px" }}
            >
              please fill all fields
            </span>
          )}
          <TextField
            type="email"
            name="email"
            label="Enter Email"
            value={inputValue.email || ""}
            onChange={handleChangeForInputs}
          />
          <TextField
            type="password"
            name="password"
            label="Enter Password"
            value={inputValue.password || ""}
            onChange={handleChangeForInputs}
          />
          <br></br>
          {!isLoginMode && (
            <div>
              <TextField
                type="text"
                name="name"
                label="Enter Name"
                value={inputValue.name || ""}
                onChange={handleChangeForInputs}
              />
              <br />
              <select id="role" onChange={(e) => setRole(e.target.value)}>
                {<option>Select role</option>}
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
          )}
          <button
            className="signbutton"
            // style={{
            //   marginTop: isLoginMode ? "1rem" : "5px",
            //   marginLeft: isLoginMode ? "4rem" : "6px",
            //   marginBottom: isLoginMode && "1px",
            //   display: "block",
            // }}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </button>{" "}
        </form>

        {isLoginMode && (
          <GoogleLogin
            className="signbutton"
            clientId="1034496854943-dbgivvgf14po4jv278ruhjr0hhebvgt0.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}

        {!error ? (
          <ModalWin
            modalisOpen={modalisOpen}
            closeModal={() => setModalisOPen(false)}
          />
        ) : (
          <ErrorModal
            modalisOpen={errModal}
            error={error}
            closeModal={() => seterrModal(false)}
          />
        )}
        <button onClick={switchModeHandler} className="signbutton" id="move">
          {isLoginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
      <div className="notice">
        <h1>Pakistan Primary School</h1>
        <div>LEARN ANYTHING</div>
        <br></br>
        <div>LEARN ANYTIME</div>
        <br></br>
        <div>LEARN ANYWHERE</div>
        <br></br>
        <div>FOR FREE</div>
      </div>
    </div>
  );
};

export default Auth;
