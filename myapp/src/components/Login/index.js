import React, { useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Login = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const jwtToken = Cookies.get("jwt_token");

  const handleChange = (event) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="username-input-field"
          value={formData.username}
          onChange={handleChange}
          placeholder="rahul"
        />
      </>
    );
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="password-input-field"
          value={formData.password}
          onChange={handleChange}
          placeholder="rahul@2021"
        />
      </>
    );
  };

  const SubmitSuccess = (jwtToken) => {
    console.log("INSIDE submitsuccess function");
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const SubmitFailure = (error) => {
    setErrorMsg(error);
    setShowSubmitError(true);
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const { username, password } = formData;
      const userDetails = { username, password };

      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
      };

      const url = "https://apis.ccbp.in/login";

      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("DATA : ", data);
        SubmitSuccess(data.jwt_token);
      } else {
        SubmitFailure(data.error_msg);
      }
    } catch (error) {
      console.log("Error While Loggin in Login Page : ", error);
    }
  };

  if(jwtToken !== undefined){
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
