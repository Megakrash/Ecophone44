const database = require("../../database");

/* BRAND */
const getBrand = (req, res) => {
  database
    .query("SELECT * FROM marque")
    .then(([brand]) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

/* MODEL */
const getModelByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query("SELECT id, name, pic FROM modele WHERE marque_id = ?", [id])
    .then(([model]) => res.status(200).json(model))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

/* REPARATION */
const getReparationByModelId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query(
      "SELECT r.id, r.name, r.price, r.position, m.name AS model, m.pic AS picmodel, mar.name AS marque FROM reparation r JOIN modele m ON r.modele_id = m.id JOIN marque mar ON m.marque_id = mar.id WHERE r.modele_id = ? ORDER BY r.position",
      [id]
    )
    .then(([reparation]) => res.status(200).json(reparation))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getBrand,
  getModelByBrandId,
  getReparationByModelId,
};
