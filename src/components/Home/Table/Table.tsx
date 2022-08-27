import React from "react";
import "./table.css";

const Table = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th> Chair </th>
            <th> The Laid Back</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> Width </th>
            <td> 80 cm </td>
          </tr>
          <tr>
            <th> Depth </th>
            <td> 70 cm </td>
          </tr>
          <tr>
            <th> Weight </th>
            <td> 16 kg </td>
          </tr>
          <tr>
            <th> Height </th>
            <td> 120 cm </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
