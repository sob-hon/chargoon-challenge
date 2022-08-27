import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import Table from "./Table/Table";

function Home() {
  const [token] = useLocalStorage<string>("token", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, []);

  return <Table />;
}

export default Home;
