import React from "react";
import { User } from "../../firebase/transportLayer";
import "./AddUser.css";

interface IProps {
  setModalOpen: (value: boolean) => void;
}

const AddUser: React.FC<IProps> = ({ setModalOpen }) => {
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
          <h1>Add User</h1>
        </div>
        <div className="body">
          <>
            <div className="fullname-wrapper">
              <h2>fullname</h2>
              <input
                className="input-text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="password-wrapper">
              <h2>password</h2>
              <input
                className="input-text"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="description-wrapper">
              <h2>description</h2>
              <textarea
                className="input-text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </>
        </div>
        <div className="footer">
          <button onClick={saveBtnClickedHandler}>
            {loading ? "Loading..." : "Save"}
          </button>
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

export default AddUser;
