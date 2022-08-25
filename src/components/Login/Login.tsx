import React, { FormEvent, useEffect, useState } from "react";
import { getData } from "../../firebase/transportLayer";
import "./login.css";

const Login = () => {
  interface User {
    description: string;
    password: string;
    fullname: string;
    id: string;
  }

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getData().then((data: any) => setUsers(data));
  }, []);

  const loginFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      users.find(
        (user) => user.fullname === userName && user.password === password
      ) === undefined
        ? "not authorized"
        : "authorized"
    );
  };

  return (
    <div className="container">
      <div className="text">Login</div>
      <form onSubmit={(e) => loginFormSubmitHandler(e)}>
        <div className="user-input-wrp">
          <br />
          <input
            type="text"
            className="inputText"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="floating-label">Your username</label>
        </div>

        <div className="user-input-wrp">
          <br />
          <input
            type="password"
            className="inputText"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="floating-label">Your password</label>
        </div>

        <div className="forgot-pass"></div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
