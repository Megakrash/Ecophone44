const knex = require("../../knex");
// -------------------------------
/* ----------- Brands -------------*/
// -------------------------------

const updateBrandIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  knex("brands")
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
      res.status(500).send("Error editing the brand index");
    });
};

const updateBrandNameById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  knex("brands")
    .where("id", id)
    .update({ name })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the brand name");
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

const updateBrandIsVisibleById = (req, res) => {
  const { id } = req.params;
  const { isVisible } = req.body;
  knex("brands")
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
      res.status(500).send("Error editing the brand is visible");
    });
};

// -------------------------------
/* ----------- Models ------------- */
// -------------------------------

const updateModelNameById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  knex("models")
    .where("id", id)
    .update({ name })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the model name");
    });
};

const updateModelIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  knex("models")
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
      res.status(500).send("Error editing the model index");
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

const updateModelIsVisibleById = (req, res) => {
  const { id } = req.params;
  const { isVisible } = req.body;
  knex("models")
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
      res.status(500).send("Error editing the model is visible");
    });
};

// -------------------------------
/* ----------- Repairs ------------- */
// -------------------------------

const updateRepairById = (req, res) => {
  const { id } = req.params;
  const { name, text, price } = req.body;
  knex("repairs")
    .where("id", id)
    .update({ name, text, price })
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
  updateBrandIndexById,
  updateBrandNameById,
  updateBrandPicByBrandId,
  updateBrandIsVisibleById,
  updateModelNameById,
  updateModelIndexById,
  updateModelPicByModelId,
  updateModelIsVisibleById,
  updateRepairById,
  updateRepairIndexById,
  updateRepairIsVisibleById,
};
