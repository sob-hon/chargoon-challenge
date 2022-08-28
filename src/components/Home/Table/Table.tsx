import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../../../firebase/transportLayer";
import Modal from "../../Modal/Modal";
import "./table.css";
interface User {
  description: string;
  password: string;
  fullname: string;
  id: string;
}

const Table = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [arrow, setArrow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");

  useEffect(() => {
    getData().then((data: any) => setUsers(data));
  }, []);

  const nameSortClickedHandler = () => {
    setArrow(!arrow);
    setUsers((prevUsers) => {
      let sortedUsers = prevUsers.sort((a, b) =>
        a.fullname.toLowerCase() > b.fullname.toLowerCase() ? 1 : -1
      );
      if (arrow) {
        sortedUsers = sortedUsers.reverse();
      }
      console.log("sorted users are: ", sortedUsers);
      return sortedUsers;
    });
  };

  const userClickedHandler = (user: User) => {
    setSelectedUser(user);
  };

  const viewBtnClickedHandler = () => {
    setModalOpen(true);
    setModalType("view");
  };

  const addBtnClickedHandler = () => {
    setModalOpen(true);
    setModalType("add");
  };

  const deleteBtnClickedHandler = () => {
    if (selectedUser) {
      setUsers((prevUsers) => {
        return prevUsers.filter((user) => user.id !== selectedUser.id);
      });
      deleteData(selectedUser.id);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          modalType={modalType}
          selectedUser={selectedUser}
        />
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={nameSortClickedHandler}>
                Name
                <div className={`arrow-icon ${arrow ? "" : "open"}`}>
                  <span className="left-bar"></span>
                  <span className="right-bar"></span>
                </div>
              </th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => userClickedHandler(user)}>
                <th> {user.fullname} </th>
                <td> {user.description} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-container">
        <button className="table-btn" onClick={viewBtnClickedHandler}>
          View
        </button>
        <button className="table-btn" onClick={addBtnClickedHandler}>
          Add
        </button>
        <button className="table-btn" onClick={deleteBtnClickedHandler}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Table;
