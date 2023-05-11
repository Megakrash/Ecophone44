const database = require("../../database");
// -------------------------------
/* ----------- Brands -------------*/
// -------------------------------

const updateBrandIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  database
    .query(`UPDATE brands set index_id = ${Number(indexId)} WHERE id = ?;`, [
      Number(id),
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  database
    .query(`UPDATE brands set name = ${JSON.stringify(name)} WHERE id = ?;`, [
      Number(id),
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  database
    .query(
      `UPDATE brands set pic = ${JSON.stringify(filename)} WHERE id = ?;`,
      [Number(id)]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  database
    .query(
      `UPDATE brands set is_visible = ${Number(isVisible)} WHERE id = ?;`,
      [Number(id)]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
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

const updateModelIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  database
    .query(`UPDATE models set index_id = ${Number(indexId)} WHERE id = ?;`, [
      Number(id),
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  database
    .query(
      `UPDATE models set pic = ${JSON.stringify(filename)} WHERE id = ?;`,
      [Number(id)]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  database
    .query(
      `UPDATE models set is_visible = ${Number(isVisible)} WHERE id = ?;`,
      [Number(id)]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
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

module.exports = {
  updateBrandIndexById,
  updateBrandNameById,
  updateBrandPicByBrandId,
  updateBrandIsVisibleById,
  updateModelIndexById,
  updateModelPicByModelId,
  updateModelIsVisibleById,
};
