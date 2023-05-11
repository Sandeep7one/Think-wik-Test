import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverLay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const rootElements = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose} />,
        rootElements
      )}
      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        rootElements
      )}
    </div>
  );
};

export default Modal;
