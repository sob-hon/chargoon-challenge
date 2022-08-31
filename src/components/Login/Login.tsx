import React, { FormEvent, useEffect, useState } from "react";
import { getData } from "../../firebase/transportLayer";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./login.css";
interface User {
  description: string;
  password: string;
  fullname: string;
  id: string;
}

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useLocalStorage<string>("token", "");
  const navigate = useNavigate();

  console.log(users);

  useEffect(() => {
    if (!token) {
      getData().then((data: any) => setUsers(data));
    } else navigate("/");
  }, []);

  const loginFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let authenticated = users.find(
      (user) => user.fullname === userName && user.password === password
    );
    if (authenticated !== undefined) {
      navigate("/");
      setToken(authenticated.id);
    }
  };

  return (
    <div className="container">
      <div className="login">
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
    </div>
  );
};

export default Login;
