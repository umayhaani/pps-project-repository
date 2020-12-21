import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
Modal.setAppElement("#root");

const ErrorModal = (props) => {
  const [modalisOpen, setModalisOPen] = useState(true);

  return (
    <div>
      {" "}
      <Modal
        isOpen={props.modalisOpen}
        onRequestClose={() => setModalisOPen(props.closeModal)}
        style={{
          overlay: {
            background: "0 0 15 rgba(0,0,0,0.2)",
          },
          content: {
            width: "300px",
            height: "300px",
            marginLeft: "35rem",
            marginTop: "8rem",
            textAlign: "center",
            boxShadow: "0 5px 8px #f5f5f5",
            fontWeight: "bolder",
          },
        }}
      >
        <div style={{ color: "red", fontSize: "large" }}>
          <ErrorOutlineRoundedIcon style={{ color: "red", fontSize: "60px" }} />
        </div>
        <h2>OOPS!</h2>
        <h3 style={{ color: "red" }}>{props.error}</h3>
        <p style={{ color: "black", marginTop: "1rem" }}>Please try again </p>
        <button
          onClick={() => setModalisOPen(props.closeModal)}
          className="closeButton"
        >
          Try Again
        </button>
      </Modal>
    </div>
  );
};
export default ErrorModal;