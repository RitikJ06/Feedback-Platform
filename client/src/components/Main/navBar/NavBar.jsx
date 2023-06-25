import React from "react";
import { Link } from "react-router-dom";
import userImg from "./../../../images/user-image.png";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <div className="headerBlock">
      <Link to="/">
        <h2>Feedback</h2>
      </Link>
      <div className="navItemsWrapper">
        {!props.isLoggedIn ? (
          <>
            <Link to="/login" className="navLoginButton">
              Log in
            </Link>
            <Link to="/signup" className="navSignupButton">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="logoutButton"
              onClick={() => {
                localStorage.removeItem("data");
              }}
            >
              Logout
            </Link>
            <span className="userName">
              {props.isDesktop ? "Hello " + props.userData.name : ""}
            </span>
            <img
              className={
                props.isDesktop ? "userImage" : "userImage userImageRes"
              }
              src={userImg}
              alt="use icon"
            />
          </>
        )}
      </div>
    </div>
  );
}
