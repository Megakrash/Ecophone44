import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img
          className="navbar_logo_img"
          src={`${
            import.meta.env.VITE_PORT_BACKEND
          }/assets/images/general/logo-simple.png`}
          alt="Ecophone 44"
        />
      </div>
      <div className="navbar_title">
        <p>BACK-OFFICE</p>
      </div>
    </div>
  );
}

export default Navbar;
