import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import ThemeToggle from "./themeToogle/ThemeToogle";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <nav className="navbar">
      <div className="navbar_container container">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            className="navbar_container_logo"
            src={`${
              import.meta.env.VITE_PORT_BACKEND
            }/assets/images/general/logo-simple.png`}
            alt="Ecophone 44"
          />
        </Link>

        <button type="button" className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <Link to="tel:+33252103771">
            <div className="phone-number">
              <FaPhone className="phone-number_fa" />
              <p>02 52 10 37 71</p>
            </div>
          </Link>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-links${isActive ? " activated" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/brands/3"
              className={({ isActive }) =>
                `nav-links${isActive ? " activated" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Reconditionnés
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/recrutement"
              className={({ isActive }) =>
                `nav-links${isActive ? " activated" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Recrutement
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-links${isActive ? " activated" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar_toogle">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
