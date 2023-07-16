const knex = require("../../knex");

/* CALENDAR */
const getCalendarForFront = (req, res) => {
  knex
    .select("*")
    .from("calendar")
    .then((calendar) => res.status(200).json(calendar))
    .catch((err) => console.error(err));
};

const postNewEvent = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    zipCode,
    startDate,
    endDate,
  } = req.body;

  knex("calendar")
    .insert({
      firstName,
      lastName,
      email,
      phoneNumber,
      zipCode,
      start_date: startDate,
      end_date: endDate,
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new event");
    });
};
/* FIRST VERIFY TOKEN */
const getUserToVerifyToken = (req, res) => {
  knex
    .select("id")
    .from("users")
    .then((user) => res.status(200).json(user))
    .catch((err) => console.error(err));
};
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  knex("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
module.exports = {
  getCalendarForFront,
  postNewEvent,
  getUserToVerifyToken,
  getUserByEmailWithPasswordAndPassToNext,
};
