const database = require("../../database");

// POST NEW BRAND
const postNewBrand = (req, res) => {
  const { name, filename, isSmart } = req.body;

  database
    .query("INSERT INTO marque(name, pic, is_smart ) VALUES (?, ?, ?);", [
      name,
      filename,
      Number(isSmart),
    ])
    .then(() => {
      res.status(201).send({ message: "Brand Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error add new Brand");
    });
};

// POST NEW MODEL
const postNewModel = (req, res) => {
  const { name, filename, marqueId } = req.body;

  database
    .query("INSERT INTO modele(name, pic, marque_id) VALUES (?, ?, ?);", [
      name,
      filename,
      marqueId,
    ])
    .then(() => {
      res.status(201).send({ message: "Model Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error add new Model");
    });
};

module.exports = {
  postNewBrand,
  postNewModel,
};
