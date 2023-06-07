import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@components/navbar/Navbar";
import Header from "@components/header/Header";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <h1 className="home_title">
        Quel type d'appareil souhaitez-vous réparer ?
      </h1>
      <div className="home_link">
        <Link to="/brands/1">
          <p className="home_link_btn">SMARTPHONE</p>
        </Link>
        <Link to="/brands/2">
          <p className="home_link_btn">TABLETTE</p>
        </Link>
      </div>
      <div className="home_refurb">
        <h1 className="home_title">
          Ou souhaitez-vous voir nos modèles reconditionnés ?
        </h1>
        <Link to="/brands/3">
          <p className="home_link_btn refurb-link">RECONDITIONNES</p>
        </Link>
      </div>
    </div>
  );
}
