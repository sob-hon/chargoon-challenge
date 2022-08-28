import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, User } from "../../firebase/transportLayer";
import useLocalStorage from "../../hooks/useLocalStorage";
import AutoComplete from "../AutoComplete/AutoComplete";
import Table from "./Table/Table";

function Home() {
  const [token] = useLocalStorage<string>("token", "");
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
    getData().then((data: any) => setUsers(data));
  }, []);

  return (
    <>
      <Table />
      <AutoComplete options={users}/>
    </>
  );
}

export default Home;
