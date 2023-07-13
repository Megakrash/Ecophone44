import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// React big Calendar config
moment.locale("fr");
const localizer = momentLocalizer(moment);
const formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, loc) =>
    `${loc.format(start, "DD/MM/YYYY", culture)} — ${loc.format(
      end,
      "DD/MM/YYYY",
      culture
    )}`,

  dayFormat: (date, culture, loc) => loc.format(date, "DD/MM/YYYY", culture),

  weekdayFormat: (date, culture, loc) => loc.format(date, "dddd", culture),

  timeGutterFormat: (date, culture, loc) => loc.format(date, "HH:mm", culture),
};

function Agenda({
  selectedRepairs,
  formDetails,
  brandName,
  modelName,
  totalCardPrice,
}) {
  const navigate = useNavigate();
  // Get the events already taken in the calendar
  const [events, setEvents] = useState([]);
  const getEventsForCalendar = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/calendar`)
      .then((response) => {
        const eventsFromAPI = response.data.map((event) => {
          return {
            start: new Date(event.start_date),
            end: new Date(event.end_date),
            title: "Non disponible",
          };
        });
        setEvents(eventsFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    getEventsForCalendar();
  }, []);
  // config the style of the events
  const eventStyleGetter = () => {
    const newStyle = {
      className: "",
      style: {},
    };

    newStyle.className = "not-allowed";

    return newStyle;
  };
  // Check screen size and change default view calendar between week & day
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  // Show confirmation when the user select a free slot
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Stock info when the user select a free slot
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowConfirmation(true);
  };

  // Add new event in Calendar
  const newEventForCalendar = () => {
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/calendar`, {
        firstName: `${formDetails.firstName}`,
        lastName: `${formDetails.lastName}`,
        email: `${formDetails.email}`,
        phoneNumber: `${formDetails.phoneNumber}`,
        zipCode: `${formDetails.zipCode}`,
        startDate: format(selectedSlot.start, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(selectedSlot.end, "yyyy-MM-dd HH:mm:ss"),
        selectedRepairs,
        formDetails,
        modelName,
        brandName,
        totalCardPrice,
      })
      .then(() => {
        navigate("/confirmation");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  return (
    <div className="agenda">
      {showConfirmation === false ? (
        <Calendar
          localizer={localizer}
          events={events}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          titleAccessor={() => "Non disponible"}
          defaultView={screenWidth > 700 ? "week" : "day"}
          views={screenWidth > 700 ? ["week"] : ["day"]}
          step={60}
          timeslots={1}
          startAccessor="start"
          endAccessor="end"
          min={new Date(2000, 1, 1, 10)}
          max={new Date(2000, 1, 1, 19)}
          messages={{
            next: ">",
            previous: "<",
            today: "aujourd'hui",
            agenda: "Agenda",
            time: "heure",
            month: "mois",
            week: "semaine",
            day: "jour",
          }}
          formats={formats}
        />
      ) : (
        <div className="agenda_box">
          <p className="agenda_box_text">
            Vous avez sélectionné le créneau du{" "}
            <span>
              {format(selectedSlot.start, "EEEE d MMMM 'à' HH'h'mm", {
                locale: fr,
              })}
            </span>
            .
          </p>
          <p className="agenda_box_text">
            Votre marque : <span>{brandName.toUpperCase()}</span>
          </p>
          <p className="agenda_box_text">
            Votre modèle : <span>{modelName.toUpperCase()}</span>
          </p>
          <p className="agenda_box_text">Réparation(s) :</p>
          {selectedRepairs.map((repair) => {
            return (
              <p className="agenda_box_text" key={repair.name}>
                - {repair.name}
              </p>
            );
          })}
          <p className="agenda_box_text">
            Montant total : <span>{totalCardPrice}.00€</span>
          </p>
          <div className="agenda_box_buttons">
            <button
              className="agenda_box_buttons_btn"
              type="button"
              onClick={() => newEventForCalendar()}
            >
              CONFIRMER
            </button>
            <button
              className="agenda_box_buttons_btn"
              type="button"
              onClick={() => setShowConfirmation(false)}
            >
              MODIFIER MON CRENEAU
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;

Agenda.propTypes = {
  selectedRepairs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  formDetails: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  brandName: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  totalCardPrice: PropTypes.number.isRequired,
};
