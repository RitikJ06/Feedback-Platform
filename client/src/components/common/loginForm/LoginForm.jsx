import React from "react";
import "./LoginForm.css";
import axios from "axios";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import emailIcon from "./../../../images/email_icon.svg";
import passIcon from "./../../../images/password_icon.svg";

export default function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8000/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (res.data.status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ name: res.data.name, jwtToken: res.data.jwtToken })
        );
        navigate("/");
      } else if (res.data.status === 401) {
        errRef.current.innerHTML = "Invalid credential, Please Try again!";
        errRef.current.style.display = "block";
      } else {
        errRef.current.innerHTML = "Server Error, Please Try again later";
        errRef.current.style.display = "block";
      }
    } catch {
      errRef.current.innerHTML = "Something went wrong, Please Try again later";
      errRef.current.style.display = "block";
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)} className="loginForm">
      <div className="errBlock" ref={errRef}></div>
      <div className="formRow">
        <span className="formIcon">
          <img src={emailIcon} alt="email-icon" />
        </span>
        <input
          className="formInput"
          type="email"
          placeholder="Email"
          name="email"
          required
          ref={emailRef}
        />
      </div>
      <div className="formRow">
        <span className="formIcon">
          <img src={passIcon} alt="passowrd-icon" />
        </span>
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          name="password"
          required
          ref={passwordRef}
        />
      </div>
      {!props.isMain && (
        <div className="formRow">
          Don’t have an account? &nbsp;
          <Link to="/signup" className="formChanger">
            Sign Up
          </Link>
        </div>
      )}
      <div
        className={
          props.isMain ? "formRow loginButtonStart" : "formRow loginButtonEnd"
        }
      >
        <button className="loginButton">Log in</button>
      </div>
    </form>
  );
}
