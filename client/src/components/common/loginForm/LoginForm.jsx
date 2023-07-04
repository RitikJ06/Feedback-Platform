import React from "react";
import "./LoginForm.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import emailIcon from "./../../../images/email_icon.svg";
import passIcon from "./../../../images/password_icon.svg";
import SignupForm from "../SignupForm/SignupForm";

export default function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(process.env.REACT_APP_BASE_URL + "/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      switch (res.data.status) {
        case 200:
          localStorage.setItem(
            "data",
            JSON.stringify({ name: res.data.name, jwtToken: res.data.jwtToken })
          );
          props.isMain ? navigate(0) : navigate("/");
          break;
        case 401:
          setErrorMsg("Invalid credential, Please Try again!");
          break;
        default:
          setErrorMsg("Server Error, Please Try again later");
      }
    } catch {
      setErrorMsg("Something went wrong, Please Try again later")
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)} className="loginForm">
      {errorMsg && <div className="errBlock">{errorMsg}</div>}
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
      <div className="formRow">
        Don’t have an account? &nbsp;
        {props.isMain ? (
          <span
            onClick={() => {
              props.setOverlayWrapperForm(
                <SignupForm
                  setFormHeading={props.setFormHeading}
                  isMain={props.isMain}
                  setOverlayWrapperForm={props.setOverlayWrapperForm}
                />
              );
              props.setFormHeading("Signup to continue");
            }}
            className="formChanger"
          >
            Sign Up
          </span>
        ) : (
          <Link to="/signup" className="formChanger">
            Sign Up
          </Link>
        )}
      </div>

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
