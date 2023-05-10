const database = require("../../database");

/* BRAND */
const getSmartBrand = (req, res) => {
  database
    .query("SELECT * FROM brands WHERE is_smart=1 ORDER BY index_id")
    .then(([brand]) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};
const getTabBrand = (req, res) => {
  database
    .query("SELECT * FROM brands WHERE is_smart=0 ORDER BY index_id")
    .then(([brand]) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};
const getBrandById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query("SELECT * FROM brands WHERE id= ?", [id])
    .then(([brand]) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

/* MODEL */
const getModelByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query("SELECT * FROM models WHERE brand_id = ? ORDER BY index_id", [
      Number(id),
    ])
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
      "SELECT r.id, r.name, r.price, r.index_id, m.name AS model, m.pic AS picmodel, mar.name AS marque FROM repairs r JOIN models m ON r.model_id = m.id JOIN brands mar ON m.brand_id = mar.id WHERE r.model_id = ? ORDER BY r.index_id",
      [id]
    )
    .then(([reparation]) => res.status(200).json(reparation))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getSmartBrand,
  getTabBrand,
  getBrandById,
  getModelByBrandId,
  getReparationByModelId,
};
