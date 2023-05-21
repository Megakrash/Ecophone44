import React from "react";

function Footer() {
  return (
    <div className="footer">
      <img
        className="footer_img"
        src={`${
          import.meta.env.VITE_PORT_BACKEND
        }/assets/images/general/logo-simple.png`}
        alt="Ecophone 44"
      />
      <p className="footer_baseline">
        © Tous droits réservés. Ecophone 44 - 2023.
      </p>
    </div>
  );
}

export default Footer;
