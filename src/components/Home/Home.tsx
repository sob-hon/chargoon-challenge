import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

function Home() {
  const [name] = useLocalStorage<string>("token", "");
  let navigate = useNavigate();
  console.log("token is:", name);

  useEffect(() => {
    if (name === "") {
      navigate("/login");
    }
  }, []);

  return <div>Home</div>;
}

export default Home;
