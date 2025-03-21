import axios from "axios";
import { useRef } from "react";
import "./register.css";
import {  useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MindHaven</h3>
          <span className="loginDesc">
          Your mental wellness, prioritized. A space to grow, supported by those who understand.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
          
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={handleLoginRedirect}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}