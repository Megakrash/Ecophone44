import React, { useState, useRef } from "react";
import api from "@components/apiRest/ApiRest";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import NavbarRepair from "@components/navbar/NavbarRepair";
import Navbar from "@components/navbar/Navbar";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import BreadcrumbsRefurb from "@components/breadcrumbs/BreadcrumbsRefurb";
import ReCAPTCHA from "react-google-recaptcha";
import Agenda from "./reservation_calendar/Agenda";

function Reservation() {
  const navigate = useNavigate();
  // Retrieve repair component information from location
  const location = useLocation();
  const { brandName } = location.state;
  const { modelName } = location.state;
  const { modelPic } = location.state;
  const { totalCardPrice } = location.state;
  const { selectedRepairs } = location.state;
  const { type } = location.state;

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
    zipCode: "",
    phoneNumber: "",
  });
  // Subscribe from the mailing list true or false
  const [suscribeList, setSuscribeList] = useState(true);
  // Completed form
  const [completedForm, setCompletedForm] = useState(false);
  const formIsCompleted = (e) => {
    e.preventDefault();
    setCompletedForm(true);
  };

  const sendEmailReservation = (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    api
      .post(`/api/sendemailreservation`, {
        formDetails,
        modelName,
        price: totalCardPrice,
        token,
      })
      .then(() => {
        navigate("/confirmation");
      })

      .catch(() => {
        console.error("error");
      });
  };

  return (
    <div className="reservation">
      {type === "repair" ? (
        <NavbarRepair
          brandName={brandName}
          modelName={modelName}
          modelPic={modelPic}
          price={totalCardPrice}
        />
      ) : (
        <Navbar />
      )}
      <div
        className={type === "repair" ? "repair_breadcrumbs" : "bread-refurb"}
      >
        {type === "repair" ? (
          <Breadcrumbs type={!completedForm ? "reservation" : "confirmation"} />
        ) : (
          <BreadcrumbsRefurb type="reservation" />
        )}
      </div>
      {!completedForm && (
        <>
          {type === "repair" ? (
            <p className="reservation_title">
              Complétez le formulaire pour prendre rendez-vous
            </p>
          ) : (
            <p className="reservation_title">
              Complétez le formulaire pour reserver votre appareil
            </p>
          )}

          <form
            action="reservation_form"
            className="reservation_form"
            onSubmit={
              type === "repair" ? formIsCompleted : sendEmailReservation
            }
          >
            <div className="reservation_form_box">
              <input
                className="reservation_form_box_input"
                type="text"
                id="firstName"
                autoComplete="given-name"
                name="firstName"
                placeholder="Votre prénom"
                onChange={(e) => {
                  setFormDetails({ ...formDetails, firstName: e.target.value });
                }}
                required
              />
              <input
                className="reservation_form_box_input"
                type="text"
                id="lastName"
                autoComplete="family-name"
                name="lastName"
                placeholder="Votre nom"
                onChange={(e) => {
                  setFormDetails({ ...formDetails, lastName: e.target.value });
                }}
                required
              />
            </div>
            <input
              className="reservation_form_box_input email-input"
              type="email"
              id="email"
              autoComplete="off"
              name="email"
              placeholder="Votre email"
              onChange={(e) => {
                setFormDetails({ ...formDetails, email: e.target.value });
              }}
              required
            />
            <div className="reservation_form_box">
              <input
                className="reservation_form_box_input"
                type="tel"
                id="zipCode"
                autoComplete="off"
                name="zip code"
                maxLength="5"
                pattern="\d{5}"
                placeholder="Votre code postal"
                onChange={(e) => {
                  const inputNumber = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (regex.test(inputNumber)) {
                    setFormDetails({ ...formDetails, zipCode: inputNumber });
                  }
                }}
              />
              <input
                className="reservation_form_box_input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Numéro de téléphone"
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
                required
              />
            </div>
            <button
              className="reservation_form_subscribe"
              type="button"
              onClick={() => setSuscribeList(!suscribeList)}
            >
              <div
                className={
                  suscribeList
                    ? "reservation_form_subscribe_checkbox"
                    : "reservation_form_subscribe_checkbox activ-checkbox"
                }
              >
                {!suscribeList && <FaCheck className="fa-checkbox" />}
              </div>
              <p className="reservation_form_subscribe_text">
                Je ne souhaite pas recevoir des informations commerciales, des
                nouveautés, des prommotions et des remises{" "}
                <span>de la part d'Ecophone 44.</span>
              </p>
            </button>
            <div className="captcha">
              <ReCAPTCHA
                sitekey={`${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`}
                ref={captchaRef}
                onChange={handleCaptchaChange}
              />
            </div>
            {recaptcha && (
              <button className="repair_bloc_card_btn btn-form" type="submit">
                {type === "repair" ? "PRENDRE RDV" : "RESERVER L'APPAREIL"}
              </button>
            )}
          </form>
        </>
      )}
      {completedForm && (
        <>
          <p className="reservation_title">Choisissez un créneau disponible</p>
          <Agenda
            selectedRepairs={selectedRepairs}
            formDetails={formDetails}
            brandName={brandName}
            modelName={modelName}
            totalCardPrice={totalCardPrice}
          />
        </>
      )}
    </div>
  );
}

export default Reservation;
