const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
const database = require("../../database");
const knex = require("../../knex");

const deleteBrandPicByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pic } = req.body;
  database
    .query(`UPDATE brands set pic = NULL WHERE id = ?;`, [Number(id)])
    .then(() => {
      try {
        if (fs.existsSync(`public/assets/images/brands/${pic}`)) {
          fs.unlink(`public/assets/images/brands/${pic}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
          res.sendStatus(204);
        } else {
          console.warn("file doesn't exists!");
        }
      } catch (err) {
        console.error(err);
      }
    })
    .catch((err) => console.error(err));
};

const deleteModelPicByModelId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pic } = req.body;
  database
    .query(`UPDATE models set pic = NULL WHERE id = ?;`, [Number(id)])
    .then(() => {
      try {
        if (fs.existsSync(`public/assets/images/models/${pic}`)) {
          fs.unlink(`public/assets/images/models/${pic}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
          res.sendStatus(204);
        } else {
          console.warn("file doesn't exists!");
        }
      } catch (err) {
        console.error(err);
      }
    })
    .catch((err) => console.error(err));
};

/* Big function to delete one brand with all the models & repairs & pics 
linked to this brand */
async function deleteBrandById(req, res) {
  const brandId = parseInt(req.params.id, 10);
  try {
    // Step 1 : delete all in "repairs" table link to this brand
    const repairsDeleted = await knex("repairs")
      .whereIn("model_id", function getRepairsToDelete() {
        this.select("id").from("models").where("brand_id", brandId);
      })
      .del();
    // Step 2 : delete all pic in the backend from "models" table link to this brand
    const modelImages = await knex
      .select("pic")
      .from("models")
      .where("brand_id", brandId);

    await Promise.all(
      modelImages.map(async (modelImage) => {
        try {
          await unlinkAsync(`public/assets/images/models/${modelImage.pic}`);
        } catch (error) {
          console.error(`Error to delete ${modelImage.pic} : `, error);
        }
      })
    );
    // Step 3 : delete all in "models" table link to this brand
    const modelsDeleted = await knex("models").where("brand_id", brandId).del();

    // Step 4 : Delete the pic brand
    const brandImage = await knex
      .select("pic")
      .from("brands")
      .where("id", brandId)
      .first();

    if (brandImage) {
      try {
        await unlinkAsync(`public/assets/images/brands/${brandImage.pic}`);
      } catch (error) {
        console.error(`Error to delete ${brandImage.pic} : `, error);
      }
    }
    // Step 5 : Delete the brand in the "brands" table
    const brandsDeleted = await knex("brands").where("id", brandId).del();

    if (repairsDeleted || modelsDeleted || brandsDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = {
  deleteBrandPicByBrandId,
  deleteModelPicByModelId,
  deleteBrandById,
};
