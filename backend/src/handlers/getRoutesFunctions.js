const knex = require("../../knex");

/* FIRST VERIFY TOKEN */
const getUserToVerifyToken = (req, res) => {
  knex
    .select("id")
    .from("users")
    .then((user) => res.status(200).json(user))
    .catch((err) => console.error(err));
};
/* BRANDS */
const getSmartBrandsForFront = (req, res) => {
  knex
    .select("id", "pic", "name")
    .from("brands")
    .where("is_visible", 1)
    .where("type", 1)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getTabBrandsForFront = (req, res) => {
  knex
    .select("id", "pic", "name")
    .from("brands")
    .where("is_visible", 1)
    .where("type", 2)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getRefurbBrandsForFront = (req, res) => {
  knex
    .select("id", "pic", "name")
    .from("brands")
    .where("is_visible", 1)
    .where("type", 3)
    .orderBy("index_id")
    .then((brand) => res.status(200).json(brand))
    .catch((err) => console.error(err));
};

const getBrandsByType = (req, res) => {
  const type = parseInt(req.params.type, 10);
  knex
    .select("*")
    .from("brands")
    .where("type", type)
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

/* MODELS */
const getModelByBrandIdForFront = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select("id", "pic", "name")
    .from("models")
    .where("brand_id", id)
    .where("is_visible", 1)
    .orderBy("index_id")
    .then((model) => res.status(200).json(model))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
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

/* REPAIRS */
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
      "r.icon_id AS iconId",
      "m.name AS model",
      "m.pic AS picModel",
      "mar.name AS marque",
      "i.pic AS picIcon"
    )
    .from("repairs as r")
    .join("models as m", "r.model_id", "m.id")
    .join("brands as mar", "m.brand_id", "mar.id")
    .join("icons as i", "r.icon_id", "i.id")
    .where("r.model_id", id)
    .orderBy("r.index_id")
    .then((reparation) => res.status(200).json(reparation))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

/* ICONS */
const getIcons = (req, res) => {
  knex
    .select("*")
    .from("icons")
    .then((icons) => res.status(200).json(icons))
    .catch((err) => console.error(err));
};

module.exports = {
  getUserToVerifyToken,
  getSmartBrandsForFront,
  getTabBrandsForFront,
  getRefurbBrandsForFront,
  getBrandsByType,
  getBrandById,
  getModelByBrandIdForFront,
  getModelByBrandId,
  getModelById,
  getRepairsByModelId,
  getIcons,
};
