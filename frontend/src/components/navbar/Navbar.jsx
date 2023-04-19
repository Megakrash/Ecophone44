import React from "react";
import { NavLink } from "react-router-dom";
import { FaInfoCircle, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <NavLink to="/">
          <img
            className="navbar_logo_img"
            src={`${
              import.meta.env.VITE_PORT_BACKEND
            }/assets/images/general/logo-simple.png`}
            alt="Ecophone 44"
          />
        </NavLink>
      </div>
      <div className="navbar_infos">
        <div className="navbar_infos_box">
          <FaMapMarkerAlt className="navbar_infos_box_fa" />
          <div className="navbar_infos_box_text">
            <p>2 rue Deurbroucq</p>
            <p>44000 Nantes</p>
          </div>
        </div>
        <div className="navbar_infos_box">
          <FaInfoCircle className="navbar_infos_box_fa" />
          <div className="navbar_infos_box_text">
            <p>02 52 10 37 71</p>
            <p>contact@ecophone44.com</p>
          </div>
        </div>
        <div className="navbar_infos_box">
          <FaClock className="navbar_infos_box_fa" />
          <div className="navbar_infos_box_text">
            <p>Lundi au samedi</p>
            <p>10:00 à 19:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
