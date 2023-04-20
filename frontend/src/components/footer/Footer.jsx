import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_logo">
        <img
          className="footer_logo_img"
          src={`${
            import.meta.env.VITE_PORT_BACKEND
          }/assets/images/general/logo-simple.png`}
          alt="Ecophone 44"
        />
        <p className="footer_logo_baseline">
          © Tous droits réservés. Ecophone 44 - 2023.
        </p>
      </div>
      <div className="footer_link">
        <Link to="/cgv">
          <li>CGV</li>
        </Link>
        <Link to="/plan">
          <li>Plan d'accès</li>
        </Link>
        <Link to="/legal">
          <li>Mentions légales</li>
        </Link>
        <Link to="/cookies">
          <li>Politique cookies</li>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
