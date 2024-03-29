import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@components/navbar/Navbar";

function Confirmation() {
  const navigate = useNavigate();
  return (
    <div className="confirmation">
      <Navbar />
      <h1 className="confirmation_title">
        Merci de nous faire confiance ! Un e-mail de confirmation vient de vous
        être envoyé.
      </h1>
      <button
        className="repair_bloc_card_btn"
        type="button"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Confirmation;
