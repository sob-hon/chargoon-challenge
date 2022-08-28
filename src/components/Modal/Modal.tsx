import React, { SetStateAction, useState } from "react";
import { getData, insertData, User } from "../../firebase/transportLayer";
import "./modal.css";

interface Props {
  setModalOpen: (value: boolean) => void;
  modalType: string;
  selectedUser: User | undefined;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Modal: React.FC<Props> = ({
  setModalOpen,
  modalType,
  selectedUser,
  setUsers,
}) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const saveBtnClickedHandler = () => {
    let addedUser: User = {
      description,
      password,
      fullname: fullName,
    };
    insertData(addedUser);
    getData().then((data: any) => setUsers(data));
    setModalOpen(false);
  };

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
          <h1>{modalType === "view" ? "View" : "Add"} User</h1>
        </div>
        <div className="body">
          <>
            <div className="fullname-wrapper">
              <h2>fullname</h2>
              {modalType === "view" ? (
                <p className="fullname-content">{selectedUser?.fullname}</p>
              ) : (
                <input
                  className="input-text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              )}
            </div>

            {modalType === "add" ? (
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
            ) : (
              ""
            )}

            <div className="description-wrapper">
              <h2>description</h2>
              {modalType === "view" ? (
                <p className="description-content">
                  {selectedUser?.description}
                </p>
              ) : (
                <textarea
                  className="input-text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </div>
          </>
        </div>
        <div className="footer">
          {modalType === "add" ? (
            <button onClick={saveBtnClickedHandler}>Save</button>
          ) : (
            ""
          )}
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
