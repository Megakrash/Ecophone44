const database = require("../../database");
// -------------------------------
/* ----------- Brand -------------*/
// -------------------------------

const updateBrandIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  database
    .query(`UPDATE marque set index_id = ${Number(indexId)} WHERE id = ?;`, [
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
    .query(`UPDATE marque set name = ${JSON.stringify(name)} WHERE id = ?;`, [
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

// -------------------------------
/* ----------- Model ------------- */
// -------------------------------

const updateModelIndexById = (req, res) => {
  const { id } = req.params;
  const { indexId } = req.body;
  database
    .query(`UPDATE modele set index_id = ${Number(indexId)} WHERE id = ?;`, [
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

module.exports = {
  updateBrandIndexById,
  updateBrandNameById,
  updateModelIndexById,
};
