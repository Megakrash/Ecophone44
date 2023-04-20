const database = require("../../database");

/* BRAND */
const getBrand = (req, res) => {
  database
    .query("SELECT * FROM marque")
    .then(([brand]) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

module.exports = {
  getBrand,
};
