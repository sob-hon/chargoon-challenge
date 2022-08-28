import React from "react";
import "./modal.css";

interface User {
  description: string;
  password: string;
  fullname: string;
  id: string;
}

interface Props {
  setModalOpen: (value: boolean) => void;
  modalType: string;
  selectedUser: User;
}

const Modal: React.FC<Props> = ({ setModalOpen, modalType, selectedUser }) => {
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
          <h1>View User</h1>
        </div>
        <div className="body">
          {modalType === "view" ? (
            <>
              <div
                className="fullname-wrapper"
              >
                <h2>fullname</h2>
                <p
                className="fullname-content"
                  style={{
                    minWidth: "50%",
                    marginTop: "5px",
                    wordBreak: "break-all",
                    maxWidth: "60%",
                  }}
                >
                  {selectedUser.fullname}
                </p>
              </div>
              <div
                className="description-wrapper"
              >
                <h2>description</h2>
                <p
                  className="description-content"
                >
                  {selectedUser.description}
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="footer">
          {modalType === "add" ? <button>Save</button> : ""}
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
