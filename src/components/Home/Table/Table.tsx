import React, { useState } from "react";
import { deleteData, User } from "../../../firebase/transportLayer";
import Modal from "../../Modal/Modal";
import "./table.css";

interface Props {
  rows: User[];
  headers: string[];
  setRows: React.Dispatch<React.SetStateAction<User[]>>;
  filteredHeaders: string[];
}

const Table: React.FC<Props> = ({
  rows,
  headers,
  setRows,
  filteredHeaders,
}) => {
  const [arrow, setArrow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");

  const nameSortClickedHandler = () => {
    setArrow(!arrow);
    setRows((prevUsers) => {
      let sortedUsers = prevUsers.sort((a, b) =>
        a.fullname.toLowerCase() > b.fullname.toLowerCase() ? 1 : -1
      );
      if (arrow) {
        sortedUsers = sortedUsers.reverse();
      }
      return prevUsers;
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
      setRows((prevUsers) => {
        return prevUsers.filter((user) => user.id !== selectedUser.id);
      });
      deleteData(selectedUser?.id);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          modalType={modalType}
          selectedUser={selectedUser}
          setUsers={setRows}
        />
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) =>
                filteredHeaders.some((head) => head === header) ? (
                  <th onClick={nameSortClickedHandler}>
                    {header}
                    <div className={`arrow-icon ${arrow ? "" : "open"}`}>
                      <span className="left-bar"></span>
                      <span className="right-bar"></span>
                    </div>
                  </th>
                ) : (
                  <th>{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.id} onClick={() => userClickedHandler(user)}>
                <th> {user.fullname} </th>
                <td> {user.description} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="selectedUser">
        {selectedUser ? (
          <p>
            Selected user is:{" "}
            <span className="selectedUser-content">
              {selectedUser?.fullname}
            </span>
          </p>
        ) : (
          <p></p>
        )}
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
