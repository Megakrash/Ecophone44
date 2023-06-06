import React from "react";

function NavbarBack() {
  return (
    <div className="navbarBack">
      <div className="navbarBack_logo">
        <img
          className="navbarBack_logo_img"
          src={`${
            import.meta.env.VITE_PORT_BACKEND
          }/assets/images/general/logo-simple.png`}
          alt="Ecophone 44"
        />
      </div>
      <div className="navbarBack_title">
        <p>BACK-OFFICE</p>
      </div>
    </div>
  );
}

export default NavbarBack;
