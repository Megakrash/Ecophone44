import React from "react";
import PropTypes from "prop-types";

function NavbarBack({
  setChoosenBrandId,
  setChoosenModelId,
  setShowCreateBrand,
  setShowType,
}) {
  return (
    <div className="navbarBack">
      <div className="navbarBack_logo">
        <button
          className="navbarBack_logo_btn"
          type="button"
          onClick={() => {
            setChoosenBrandId(0);
            setChoosenModelId(0);
            setShowCreateBrand(false);
            setShowType(null);
          }}
        >
          <img
            className="navbarBack_logo_btn_img"
            src={`${
              import.meta.env.VITE_PORT_BACKEND
            }/assets/images/general/logo-simple.png`}
            alt="Ecophone 44"
          />
        </button>
      </div>
      <div className="navbarBack_title">
        <p>BACK-OFFICE</p>
      </div>
    </div>
  );
}

export default NavbarBack;

NavbarBack.propTypes = {
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowCreateBrand: PropTypes.func.isRequired,
  setShowType: PropTypes.func.isRequired,
};
