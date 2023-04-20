import React from "react";

function Header() {
  return (
    <div className="header">
      {/* <div className="header_text">
        <p>Votre réparateur de Smartphones & Tablettes</p>
        <p>sur Nantes depuis 2012</p>
      </div> */}
      <img
        className="header_img"
        src={`${
          import.meta.env.VITE_PORT_BACKEND
        }/assets/images/general/header.jpg`}
        alt="Ecophone 44"
      />
    </div>
  );
}

export default Header;
