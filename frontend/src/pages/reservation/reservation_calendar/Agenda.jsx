// import React, { useEffect } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "moment/locale/fr";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// React big Calendar config
// moment.locale("fr");
// const localizer = momentLocalizer(moment);
// const formats = {
//   dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
//     `${localizer.format(start, "DD/MM/YYYY", culture)} — ${localizer.format(
//       end,
//       "DD/MM/YYYY",
//       culture
//     )}`,

//   dayFormat: (date, culture, localizer) =>
//     localizer.format(date, "DD/MM/YYYY", culture),

//   weekdayFormat: (date, culture, localizer) =>
//     localizer.format(date, "dddd", culture),

//   timeGutterFormat: (date, culture, localizer) =>
//     localizer.format(date, "HH:mm", culture),
// };

function Agenda() {
  // const [events, setEvents] = useState([]);
  // const getEventsForCalendar = () => {
  //   axios
  //     .get(`${import.meta.env.VITE_PORT_BACKEND}/calendar`)
  //     .then((response) => {
  //       const eventsFromAPI = response.data.map((event) => {
  //         return {
  //           start: new Date(event.start_date),
  //           end: new Date(event.end_date),
  //           title: "Non disponible",
  //         };
  //       });
  //       setEvents(eventsFromAPI);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // };

  // useEffect(() => {
  //   getEventsForCalendar();
  // }, []);

  return (
    <div className="agenda">
      {/* <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        step={60}
        timeslots={1}
        startAccessor="start"
        endAccessor="end"
        min={new Date(2000, 1, 1, 10)}
        max={new Date(2000, 1, 1, 18)}
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
      /> */}
    </div>
  );
}

export default Agenda;
