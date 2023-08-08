const fs = require("fs");
const knex = require("../../knex");

/* HEADER */
const getheader = (req, res) => {
  knex
    .select("*")
    .from("header")
    .then((user) => res.status(200).json(user))
    .catch((err) => console.error(err));
};

const postNewHeaderPic = (req, res) => {
  const { name, filename } = req.body;
  knex("header")
    .insert({
      name,
      pic: filename,
    })
    .then(() => {
      res.status(201).send({ message: "Header pic Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new header pic");
    });
};
const deleteHeaderPic = (req, res) => {
  const { id } = req.params;

  knex("header")
    .where("id", id)
    .first()
    .then((row) => {
      if (!row) {
        res.status(404).send("Entry not found");
        return;
      }
      const picPath = `public/assets/images/header/${row.pic}`;

      if (fs.existsSync(picPath)) {
        fs.unlink(picPath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error deleting the file");
            return;
          }
          knex("header")
            .where("id", id)
            .del()
            .then(() => {
              res.status(204).send();
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .send("Error deleting the entry from the database");
            });
        });
      } else {
        console.error("File doesn't exist:", picPath);
        res.status(404).send("File not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching the entry from the database");
    });
};

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
  getheader,
  postNewHeaderPic,
  deleteHeaderPic,
  getCalendarForFront,
  postNewEvent,
  getUserToVerifyToken,
  getUserByEmailWithPasswordAndPassToNext,
};
