import React from "react";
import "./SignupForm.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import userIcon from "./../../../images/user_icon.svg";
import emailIcon from "./../../../images/email_icon.svg";
import passIcon from "./../../../images/password_icon.svg";
import mobileIcon from "./../../../images/mobile_icon.svg";

import LoginForm from "../loginForm/LoginForm";

export default function SignupForm(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8000/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        mobile: mobileRef.current.value,
        password: passwordRef.current.value,
      });

      if (res.data.status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ name: res.data.name, jwtToken: res.data.jwtToken })
        );
        props.isMain ? navigate(0): navigate("/");
      } else if (res.data.status === 403) {
        errRef.current.innerHTML =
          "User already exist with this email. Please login!";
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
    <form onSubmit={(e) => handleSignup(e)} className="signupForm">
      <div className="errBlock" ref={errRef}></div>
      <div className="formRow">
        <span className="formIcon">
          <img src={userIcon} alt="user-icon" />
        </span>
        <input
          className="formInput"
          type="text"
          placeholder="Name"
          name="username"
          required
          ref={nameRef}
        />
      </div>
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
          <img src={mobileIcon} alt="mobile-icon" />
        </span>
        <input
          className="formInput"
          type="number"
          placeholder="Mobile"
          name="mobile"
          required
          ref={mobileRef}
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
        Already have an account? &nbsp;
        {props.isMain ? (
          <span
            onClick={() => {
              props.setOverlayWrapperForm(<LoginForm setFormHeading={props.setFormHeading} isMain={props.isMain} setOverlayWrapperForm={props.setOverlayWrapperForm} />);
              props.setFormHeading("Log in to continue")
            }}
            className="formChanger"
          >
            Log in
          </span>
        ) : (
          <Link to="/login" className="formChanger">
            Log in
          </Link>
        )}
      </div>
      <div
        className={
          props.isMain ? "formRow loginButtonStart" : "formRow loginButtonEnd"
        }
      >
        <button className="signupButton">Signup</button>
      </div>
    </form>
  );
}
