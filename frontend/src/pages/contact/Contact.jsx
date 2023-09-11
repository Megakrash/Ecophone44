import React, { useState, useRef } from "react";
import api from "@components/apiRest/ApiRest";
import Navbar from "@components/navbar/Navbar";
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // ReCaptcha
  const [recaptcha, setRecaptcha] = useState(false);
  const captchaRef = useRef(null);
  const handleCaptchaChange = (value) => {
    setRecaptcha(!!value);
  };

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
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    api
      .post(`/api/sendcontactemail`, {
        formDetails,
        token,
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
        setRecaptcha(false);
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
        <img
          className="contact_header_img"
          src={`${
            import.meta.env.VITE_PORT_BACKEND
          }/assets/images/general/contact.jpg`}
          alt="recrutement"
        />
        <p className="contact_header_title">Contactez-nous</p>
        <p className="contact_header_text1">
          Vous pouvez nous joindre au XX XX XX XX XX
        </p>
        <p className="contact_header_text2">du Lundi au Samedi de 10H à 19H</p>
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
            Une erreur s'est produite. Contactez-nous au XX XX XX XX XX ou à
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
            placeholder="Nom*"
            value={formDetails.lastName}
            onChange={(e) => {
              setFormDetails({ ...formDetails, lastName: e.target.value });
            }}
            required
          />
          <input
            className="reservation_form_box_input"
            type="text"
            id="firstName"
            autoComplete="given-name"
            name="firstName"
            placeholder="Prénom*"
            value={formDetails.firstName}
            onChange={(e) => {
              setFormDetails({ ...formDetails, firstName: e.target.value });
            }}
            required
          />
        </div>
        <div className="reservation_form_box">
          <input
            className="reservation_form_box_input"
            type="email"
            id="email"
            autoComplete="off"
            name="email"
            placeholder="Email*"
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
            placeholder="Message*"
            value={formDetails.message}
            onChange={(e) => {
              setFormDetails({ ...formDetails, message: e.target.value });
            }}
            required
          />
        </div>
        <div className="captcha">
          <ReCAPTCHA
            sitekey={`${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`}
            ref={captchaRef}
            onChange={handleCaptchaChange}
          />
        </div>
        {recaptcha && (
          <button className="submit-contact" type="submit">
            Envoyer
          </button>
        )}
      </form>
      <iframe
        className="contact_map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.35562200475!2d-1.5612989236293695!3d47.20962357115616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eea9e96fa3ff%3A0x5ce71b4c383f7a17!2sEcophone%2044!5e0!3m2!1sfr!2sfr!4v1693819855053!5m2!1sfr!2sfr"
        loading="lazy"
        title="Carte Google Maps d'Ecophone 44"
      />
    </div>
  );
}

export default Contact;
