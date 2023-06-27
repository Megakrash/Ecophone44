import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import NavbarBack from "@components/navbar/NavbarBack";

function Login({ setUserContext }) {
  const [showError, setShowError] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/login`, loginDetails)
      .then((res) => {
        setUserContext(res.data);
        localStorage.setItem(
          "Eco44Token",
          JSON.stringify({
            userToken: res.data.userToken,
            userId: res.data.userId,
          })
        );
        navigate("/admin");
      })
      .catch(() => {
        setLoginDetails({ email: "", password: "" });
        setShowError(true);
      });
  };

  return (
    <div className="login">
      <NavbarBack />
      <form onSubmit={loginUser} className="login_form" action="">
        <label className="login_form_label" htmlFor="email">
          Email
        </label>
        <input
          className="login_form_input"
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={(e) => {
            setLoginDetails({ ...loginDetails, email: e.target.value });
            setShowError(false);
          }}
          required
        />
        <label className="login_form_label" htmlFor="password">
          Password
        </label>
        <input
          className="login_form_input"
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={(e) => {
            setLoginDetails({ ...loginDetails, password: e.target.value });
            setShowError(false);
          }}
          required
        />
        {showError === true && (
          <p className="login_form_error">Wrong email or password</p>
        )}
        <button className="login_form_submit" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setUserContext: PropTypes.func.isRequired,
};
