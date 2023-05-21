import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Login({ setUserContext }) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

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
      })
      .catch((err) => console.error("error", err));
  };

  return (
    <div className="login">
      <form onSubmit={loginUser} className="login_form" action="">
        <label className="login_form_label" htmlFor="email">
          Email
        </label>
        <input
          className="login_form_input"
          type="email"
          name="email"
          onChange={(e) => {
            setLoginDetails({ ...loginDetails, email: e.target.value });
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
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
          required
        />
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
