import React from "react";
import { User } from "../../firebase/transportLayer";
import "./ViewUser.css"

interface IProps {
  setModalOpen: (value: boolean) => void;
  selectedUser: User | undefined;
}

const ViewUser: React.FC<IProps> = ({ setModalOpen, selectedUser }) => {
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
          <>
            <div className="fullname-wrapper">
              <h2>fullname</h2>
              <p className="fullname-content">{selectedUser?.fullname}</p>
            </div>

            <div className="description-wrapper">
              <h2>description</h2>
              <p className="description-content">{selectedUser?.description}</p>
            </div>
          </>
        </div>
        <div className="footer">
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

export default ViewUser;
