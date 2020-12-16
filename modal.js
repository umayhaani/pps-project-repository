import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
Modal.setAppElement("#root");

const ModalWin = (props) => {
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
            color: "crimson",
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
        <div style={{ color: "green", fontSize: "large" }}>
          <CheckCircleOutlineRoundedIcon
            style={{ color: "green", fontSize: "60px" }}
          />
        </div>
        <h2 style={{ color: "green" }}>SIGN-UP SUCCESSFUL!</h2>
        <p style={{ color: "black" }}>Please switch to LOGIN and continue </p>
        <button
          onClick={() => setModalisOPen(props.closeModal)}
          className="closeButton"
        >
          CLOSE
        </button>
      </Modal>
    </div>
  );
};
export default ModalWin;
