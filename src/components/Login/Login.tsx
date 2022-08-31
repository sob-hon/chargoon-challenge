import React, {
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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
      (user) =>
        user.fullname === userNameRef.current?.value &&
        user.password === passwordRef.current?.value
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
              ref={userNameRef}
              type="text"
              className="inputText"
              required
            />
            <label className="floating-label">Your username</label>
          </div>

          <div className="user-input-wrp">
            <br />
            <input
              ref={passwordRef}
              type="password"
              className="inputText"
              required
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
