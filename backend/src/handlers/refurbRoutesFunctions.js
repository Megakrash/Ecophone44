const knex = require("../../knex");

const getRefurbByIdForFront = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex
    .select("m.name", "m.text", "m.price", "m.pic", "b.name as brandName")
    .from("models as m")
    .join("brands as b", "m.brand_id", "b.id")
    .where("m.id", id)
    .where("m.is_visible", 1)
    .then((refurb) => res.status(200).json(refurb))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// POST NEW MODEL FOR REFURB

const baseNewModelRefurb = {
  text: "Ecophone 44 vous propose des appareils reconditionnés par notre atelier technique. L'appareil est testé avec 28 points de contrôle, fourni avec tous les accessoires de charge et un verre trempé de protection directement installé sur l'écran. Le smartphone est révisé, nettoyé et garanti par notre service technique. Tous nos smartphones reconditionnés sont vendus débloqués et peuvent être utilisés avec n'importe quel opérateur.",
  price: "199",
};

const postNewModelRefurb = (req, res) => {
  const { name, filename, brandId } = req.body;

  knex("models")
    .insert({
      name,
      pic: filename,
      brand_id: Number(brandId),
      text: baseNewModelRefurb.text,
      price: baseNewModelRefurb.price,
    })
    .then(() => {
      res.status(201).send({ message: "Model Refurb Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new model refurb");
    });
};
module.exports = {
  getRefurbByIdForFront,
  postNewModelRefurb,
};
