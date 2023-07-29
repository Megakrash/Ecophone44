import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ThemeToggle from "./themeToogle/ThemeToogle";

function NavbarRepair({ brandName, modelName, modelPic, price }) {
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}models/`;
  return (
    <div className="navbarRepair">
      <div className="navbar_logo">
        <NavLink to="/">
          <img
            className="navbar_container_logo navbarRepair_logo"
            src={`${
              import.meta.env.VITE_PORT_BACKEND
            }/assets/images/general/logo-simple.png`}
            alt="Ecophone 44"
          />
        </NavLink>
      </div>
      <div className="navbarRepair_infos">
        <img
          className="navbarRepair_infos_pic"
          src={picPath + modelPic}
          alt={modelName}
        />
        <div className="navbarRepair_infos_name">
          <p className="navbarRepair_infos_name_brand">
            {brandName.toUpperCase()}
          </p>
          <p className="navbarRepair_infos_name_model">
            {modelName.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="navbarRepair_cart">
        <p className="navbarRepair_infos_name_brand">Total de votre devis :</p>
        <p className="navbarRepair_infos_name_model">{price}.00€</p>
      </div>
      <div className="navbar_toogle">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default NavbarRepair;

NavbarRepair.propTypes = {
  brandName: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  modelPic: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
