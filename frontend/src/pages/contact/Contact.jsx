import React, { useState } from "react";
import api from "@components/apiRest/ApiRest";
import Navbar from "@components/navbar/Navbar";

function Contact() {
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // Create state for form
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const sendContactEmail = (e) => {
    e.preventDefault();
    api
      .post(`/api/sendemailcontact`, {
        formDetails,
      })
      .then(() => {
        setConfirmMessage(true);
        setFormDetails({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      })

      .catch(() => {
        console.error("error");
        setErrorMessage(true);
      });
  };
  return (
    <div className="contact">
      <Navbar />
      <div className="contact_header">
        <p className="contact_header_title">Contactez-nous</p>
        <p className="contact_header_text">
          Vous pouvez nous joindre au 02 52 10 37 71
        </p>
        <p className="contact_header_text">du Lundi au Samedi de 10H à 19H</p>
      </div>
      <h1 className="home_title">Besoin d'un renseignement ?</h1>

      <form
        action="contact_form"
        className="reservation_form"
        onSubmit={sendContactEmail}
      >
        {confirmMessage && (
          <div className="confirm-message">
            Votre formulaire a été soumis avec succès.
          </div>
        )}
        {errorMessage && (
          <div className="confirm-message error-message">
            Il s'est produit une erreur. Contactez-nous au 02 52 10 37 71 ou à
            contact@ecophone44.megakrash.com
          </div>
        )}
        <div className="reservation_form_box">
          <input
            className="reservation_form_box_input"
            type="text"
            id="lastName"
            autoComplete="family-name"
            name="lastName"
            placeholder="Nom"
            value={formDetails.lastName}
            onChange={(e) => {
              setFormDetails({ ...formDetails, lastName: e.target.value });
            }}
          />
          <input
            className="reservation_form_box_input"
            type="text"
            id="firstName"
            autoComplete="given-name"
            name="firstName"
            placeholder="Prénom"
            value={formDetails.firstName}
            onChange={(e) => {
              setFormDetails({ ...formDetails, firstName: e.target.value });
            }}
          />
        </div>
        <div className="reservation_form_box">
          <input
            className="reservation_form_box_input"
            type="email"
            id="email"
            autoComplete="off"
            name="email"
            placeholder="Email"
            value={formDetails.email}
            onChange={(e) => {
              setFormDetails({ ...formDetails, email: e.target.value });
            }}
            required
          />
          <input
            className="reservation_form_box_input"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Numéro de téléphone"
            value={formDetails.phoneNumber}
            maxLength="10"
            pattern="\d{10}"
            onChange={(e) => {
              const inputNumber = e.target.value;
              const regex = /^[0-9]*$/;
              if (regex.test(inputNumber)) {
                setFormDetails({
                  ...formDetails,
                  phoneNumber: inputNumber,
                });
              }
            }}
          />
        </div>
        <div className="reservation_form_box">
          <textarea
            className="reservation_form_box_input message-input"
            type="textarea"
            id="message"
            autoComplete="off"
            name="message"
            placeholder="Message"
            value={formDetails.message}
            onChange={(e) => {
              setFormDetails({ ...formDetails, message: e.target.value });
            }}
            required
          />
        </div>
        <button className="submit-contact" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Contact;
