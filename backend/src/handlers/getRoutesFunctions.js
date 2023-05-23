const knex = require("../../knex");

/* BRAND */
const getSmartBrand = (req, res) => {
  knex
    .select("*")
    .from("brands")
    .where("type", 1)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getTabBrand = (req, res) => {
  knex
    .select("*")
    .from("brands")
    .where("type", 2)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getRefurbBrand = (req, res) => {
  knex
    .select("*")
    .from("brands")
    .where("type", 3)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getBrandById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select("*")
    .from("brands")
    .where("id", id)
    .then((brand) => res.status(200).json(brand[0]))
    .catch((err) => console.error(err));
};

/* MODEL */
// for back-office
const getModelByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select("*")
    .from("models")
    .where("brand_id", id)
    .orderBy("index_id")
    .then((model) => res.status(200).json(model))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getModelById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select("*")
    .from("models")
    .where("id", id)
    .then((model) => res.status(200).json(model[0]))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

/* REPARATION */
// for back-office
const getRepairsByModelId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select(
      "r.id",
      "r.name",
      "r.price",
      "r.index_id",
      "r.is_visible",
      "r.text",
      "m.name AS model",
      "m.pic AS picmodel",
      "mar.name AS marque"
    )
    .from("repairs as r")
    .join("models as m", "r.model_id", "m.id")
    .join("brands as mar", "m.brand_id", "mar.id")
    .where("r.model_id", id)
    .orderBy("r.index_id")
    .then((reparation) => res.status(200).json(reparation))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// for front
const getRepairsByModelIdForFront = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select(
      "r.id",
      "r.name",
      "r.price",
      "r.index_id",
      "r.is_visible",
      "r.text",
      "m.name AS model",
      "m.pic AS picmodel",
      "mar.name AS marque"
    )
    .from("repairs as r")
    .join("models as m", "r.model_id", "m.id")
    .join("brands as mar", "m.brand_id", "mar.id")
    .where("r.model_id", id)
    .andWhere("r.is_visible", 1)
    .orderBy("r.index_id")
    .then((reparation) => res.status(200).json(reparation))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getSmartBrand,
  getTabBrand,
  getRefurbBrand,
  getBrandById,
  getModelByBrandId,
  getModelById,
  getRepairsByModelId,
  getRepairsByModelIdForFront,
};
