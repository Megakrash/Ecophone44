import React from "react";
import { Link } from "react-router-dom";
import LinkBrands from "./LinkBrands";
import LinkRefurb from "./LinkRefurb";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_infos">
        <div className="footer_infos_google">
          <h2 className="footer_infos_google_title">PLAN</h2>
          <iframe
            className="footer_infos_google_map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.3554357890566!2d-1.5613042888760713!3d47.209627215187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eea9e96fa3ff%3A0x5ce71b4c383f7a17!2sEcophone%2044!5e0!3m2!1sfr!2sfr!4v1692806726738!5m2!1sfr!2sfr"
            loading="lazy"
            title="Carte Google Maps d'Ecophone 44"
          />
        </div>
        <div className="footer_infos_schedules">
          <div className="footer_infos_schedules_bloc">
            <h2 className="footer_infos_google_title">HORAIRES</h2>
            <div className="footer_infos_schedules_bloc_text">
              <p>Du lundi au samedi</p>
              <p>10H – 19H</p>
              <p>Sans interruption</p>
            </div>
          </div>
          <div className="footer_infos_schedules_bloc">
            <h2 className="footer_infos_google_title">ADRESSE</h2>
            <div className="footer_infos_schedules_bloc_text">
              <p>Il était une fois</p>
              <p>44000 WestSide</p>
            </div>
          </div>
          <div className="footer_infos_schedules_bloc">
            <h2 className="footer_infos_google_title">CONTACT</h2>
            <div className="footer_infos_schedules_bloc_text">
              <p>Téléphone : XX XX XX XX XX</p>
              <p>Email : contact@ecophone44.megakrash.com</p>
            </div>
          </div>
        </div>
        <div className="footer_infos_schedules">
          <h2 className="footer_infos_google_title">SMARTPHONES</h2>
          <LinkBrands />
        </div>
        <div className="footer_infos_schedules">
          <h2 className="footer_infos_google_title">RECONDITIONNES</h2>
          <LinkRefurb />
        </div>
      </div>
      <div className="footer_legal">
        <Link to="/">
          <img
            className="footer_legal_img"
            src={`${
              import.meta.env.VITE_PORT_BACKEND
            }/assets/images/general/logo-simple.png`}
            alt="Ecophone 44"
          />
        </Link>

        <div className="footer_legal_baseline">
          <p>Création Megakrash @2023 -</p>
          <Link to="/cgv">
            <p>CGV -</p>
          </Link>
          <Link to="/mentions-legales">
            <p> Mentions légales</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
