import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import NavbarRepair from "@components/navbar/NavbarRepair";
import Navbar from "@components/navbar/Navbar";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import BreadcrumbsRefurb from "@components/breadcrumbs/BreadcrumbsRefurb";
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
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/sendemailreservation`, {
        formDetails,
        modelName,
        price: totalCardPrice,
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
      <div className="repair_breadcrumbs">
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
                type="text"
                name="zipCode"
                placeholder="Votre code postal"
                onChange={(e) => {
                  setFormDetails({ ...formDetails, zipCode: e.target.value });
                }}
              />
              <input
                className="reservation_form_box_input"
                type="text"
                name="phoneNumber"
                placeholder="Numéro de téléphone"
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    phoneNumber: e.target.value,
                  });
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
            <button className="repair_bloc_card_btn btn-form" type="submit">
              {type === "repair" ? "PRENDRE RDV" : "RESERVER L'APPAREIL"}
            </button>
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
