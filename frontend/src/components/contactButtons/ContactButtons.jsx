import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa6";

function ContactButtons() {
  return (
    <div className="contactButtons">
      <Link to="tel:+33252103771">
        <div className="contactButtons_btn">
          <FaPhone className="contactButtons_btn_fa" />
        </div>
      </Link>
      <Link to="mailto: contact@ecophone44.megakrash.com">
        <div className="contactButtons_btn">
          <FaEnvelope className="contactButtons_btn_fa" />
        </div>
      </Link>
    </div>
  );
}

export default ContactButtons;
