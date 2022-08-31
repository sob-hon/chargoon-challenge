import React, { useState } from "react";
import { getData, insertData, User } from "../../firebase/transportLayer";
import "./AddUser.css";

interface IProps {
  setModalOpen: (value: boolean) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUser: React.FC<IProps> = ({ setModalOpen, setUsers }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const saveBtnClickedHandler = async () => {
    let addedUser: User = {
      description,
      password,
      fullname: fullName,
    };
    setLoading(true);
    await insertData(addedUser);
    setLoading(false);
    const data: any = await getData();
    setUsers(data);
    setModalOpen(false);
  };

  return (
    <>
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
    </>
  );
};

export default AddUser;
