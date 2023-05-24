const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
const knex = require("../../knex");

// -------------------------------
// ----------- Brands ------------
// -------------------------------

const deleteBrandPicByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pic } = req.body;

  knex
    .transaction((trx) => {
      return trx("brands")
        .where("id", id)
        .update("pic", null)
        .then(() => {
          if (fs.existsSync(`public/assets/images/brands/${pic}`)) {
            fs.unlink(`public/assets/images/brands/${pic}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
            res.sendStatus(204);
          } else {
            console.warn("file doesn't exist!");
          }
        });
    })
    .catch((err) => {
      console.error(err);
    });
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
// -------------------------------
// ----------- Models ------------
// -------------------------------
const deleteModelPicByModelId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pic } = req.body;
  // Update the "pic" name in "models" table to "null" then delete the file
  knex
    .transaction((trx) => {
      return trx("models")
        .where("id", id)
        .update("pic", null)
        .then(() => {
          if (fs.existsSync(`public/assets/images/models/${pic}`)) {
            fs.unlink(`public/assets/images/models/${pic}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
            res.sendStatus(204);
          } else {
            console.warn("file doesn't exist!");
          }
        });
    })
    .catch((err) => {
      console.error(err);
    });
};
/* Big function to delete one model with all the repairs & pics 
linked to this model */
async function deleteModelById(req, res) {
  const modelId = parseInt(req.params.id, 10);
  try {
    // Step 1 : Delete all repairs for this model
    await knex("repairs").where("model_id", modelId).del();

    // Step 2 : Get the modelPic name
    const model = await knex("models")
      .select("pic")
      .where("id", modelId)
      .first();

    if (model) {
      // Delete the file
      try {
        await fs.promises.unlink(`public/assets/images/models/${model.pic}`);
      } catch (error) {
        console.error(`Erreur lors de la suppression de ${model.pic} :`, error);
      }
    }

    // Step 3 : Delete the model in models table
    await knex("models").where("id", modelId).del();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// -------------------------------
// ----------- Repairs -----------
// -------------------------------

const deleteRepairById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  knex("repairs")
    .where("id", id)
    .del()
    .then(() => res.status(201).send({ message: "Repair deleted" }))
    .catch((err) => console.error(err));
};

module.exports = {
  deleteBrandPicByBrandId,
  deleteBrandById,
  deleteModelPicByModelId,
  deleteModelById,
  deleteRepairById,
};
