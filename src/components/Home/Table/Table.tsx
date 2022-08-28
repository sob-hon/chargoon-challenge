import React, { useEffect, useState } from "react";
import { getData } from "../../../firebase/transportLayer";
import "./table.css";

const Table = () => {
  interface User {
    description: string;
    password: string;
    fullname: string;
    id: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const [arrow, setArrow] = useState(false);

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

  return (
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
            <tr key={user.id}>
              <th> {user.fullname} </th>
              <td> {user.description} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
