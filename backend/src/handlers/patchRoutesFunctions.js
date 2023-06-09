const knex = require("../../knex");
// -------------------------------
/* ----------- Brands -------------*/
// -------------------------------

const updateBrandById = (req, res) => {
  const { id } = req.params;
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    switch (key) {
      case "indexId":
        updates.index_id = Number(value);
        break;
      case "name":
        updates.name = value;
        break;
      case "isVisible":
        updates.is_visible = Number(value);
        break;
      default:
        break;
    }
  }

  knex("brands")
    .where("id", id)
    .update(updates)
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the brand");
    });
};

const updateBrandPicByBrandId = (req, res) => {
  const { id } = req.params;
  const { filename } = req.body;
  knex("brands")
    .where("id", id)
    .update({ pic: filename })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the brand new pic");
    });
};

// -------------------------------
/* ----------- Models ------------- */
// -------------------------------

const updateModelById = (req, res) => {
  const { id } = req.params;
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    switch (key) {
      case "name":
        updates.name = value;
        break;
      case "text":
        updates.text = value;
        break;
      case "price":
        updates.price = value;
        break;
      case "isVisible":
        updates.is_visible = Number(value);
        break;
      case "indexId":
        updates.index_id = Number(value);
        break;
      default:
        break;
    }
  }

  knex("models")
    .where("id", id)
    .update(updates)
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the model");
    });
};

const updateModelPicByModelId = (req, res) => {
  const { id } = req.params;
  const { filename } = req.body;
  knex("models")
    .where("id", id)
    .update({ pic: filename })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the new model pic");
    });
};

// -------------------------------
/* ----------- Repairs ------------- */
// -------------------------------

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
module.exports = {
  updateBrandById,
  updateBrandPicByBrandId,
  updateModelById,
  updateModelPicByModelId,
  updateRepairById,
  updateRepairIndexById,
  updateRepairIsVisibleById,
};
