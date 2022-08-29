import React, { useState } from "react";
import { User } from "../../firebase/transportLayer";
import useDebounce from "../../hooks/useDebounce";
import "./autocomplete.css";

interface Pros {
  options: User[];
}

const AutoComplete: React.FC<Pros> = ({ options }) => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue, 500);
  const findTypedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  console.log("Debounced value is: ", debouncedValue);

  return (
    <div className="autocomplete-container">
      <label htmlFor="autocomplete">Auto Complete</label>
      <input
        id="autocomplete"
        type="text"
        className="autocomplete-input"
        placeholder="Type Sth..."
        value={searchValue}
        onChange={findTypedValue}
      />
      <ul className="autocomplete-list">
        {options
          .filter((opt) =>
            opt.fullname.toLowerCase().includes(debouncedValue.toLowerCase())
          )
          .map((opt) => (
            <li className="autocomplete-item" key={opt.id}>{opt.fullname}</li>
          ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
