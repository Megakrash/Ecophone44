const knex = require("../../knex");

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
      "r.icon_id AS iconId",
      "m.name AS modelName",
      "m.pic AS modelPic",
      "b.name AS brandName",
      "i.pic AS picIcon"
    )
    .from("repairs as r")
    .join("models as m", "r.model_id", "m.id")
    .join("brands as b", "m.brand_id", "b.id")
    .join("icons as i", "r.icon_id", "i.id")
    .where("r.model_id", id)
    .where("r.is_visible", 1)
    .orderBy("r.index_id")
    .then((repair) => res.status(200).json(repair))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postNewRepair = (req, res) => {
  const { name, text, price, modelId } = req.body;

  knex("repairs")
    .insert({
      name,
      text,
      price,
      icon_id: 1,
      model_id: Number(modelId),
    })
    .then(() => {
      res.status(201).send({ message: "Repair Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new repair");
    });
};

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
    .then((repair) => res.status(200).json(repair))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const updateRepairById = (req, res) => {
  const { id } = req.params;
  const { name, text, price, iconId } = req.body;
  knex("repairs")
    .where("id", id)
    .update({ name, text, price, icon_id: iconId })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error update repair infos");
    });
};
const updateRepairIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  knex("repairs")
    .where("id", id)
    .update({ index_id: Number(indexId) })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the repair index");
    });
};
const updateRepairIsVisibleById = (req, res) => {
  const { id } = req.params;
  const { isVisible } = req.body;
  knex("repairs")
    .where("id", id)
    .update({ is_visible: Number(isVisible) })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the repair is visible");
    });
};
const deleteRepairById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex("repairs")
    .where("id", id)
    .del()
    .then(() => res.status(201).send({ message: "Repair deleted" }))
    .catch((err) => console.error(err));
};
const getIcons = (req, res) => {
  knex
    .select("*")
    .from("icons")
    .then((icons) => res.status(200).json(icons))
    .catch((err) => console.error(err));
};

module.exports = {
  getRepairsByModelIdForFront,
  postNewRepair,
  getRepairsByModelId,
  updateRepairById,
  updateRepairIndexById,
  updateRepairIsVisibleById,
  deleteRepairById,
  getIcons,
};
