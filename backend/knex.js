require("dotenv").config();

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

knex
  .raw("SELECT 1")
  .then(() => {
    console.warn("Knex connected 👍🏻");
  })
  .catch((err) => console.error(err));

module.exports = knex;
