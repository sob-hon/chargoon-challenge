import React, { useState } from "react";
import { getData, insertData, User } from "../../firebase/transportLayer";
import "./modal.css";

interface Props {
  setModalOpen: (value: boolean) => void;
  title: string;
  body: React.ReactNode;
}

const Modal: React.FC<Props> = ({ setModalOpen, title, body }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="modal-btn"
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        {body}
      </div>
    </div>
  );
};

export default Modal;
