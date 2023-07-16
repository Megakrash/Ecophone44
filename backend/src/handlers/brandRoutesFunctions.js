const fs = require("fs");
const { promisify } = require("util");
const knex = require("../../knex");

const unlinkAsync = promisify(fs.unlink);

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
const postNewBrand = (req, res) => {
  const { name, filename, type } = req.body;

  knex("brands")
    .insert({ name, pic: filename, type: Number(type) })
    .then(() => {
      res.status(201).send({ message: "Brand Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new Brand");
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
module.exports = {
  getSmartBrandsForFront,
  getTabBrandsForFront,
  getRefurbBrandsForFront,
  getBrandsByType,
  getBrandById,
  updateBrandById,
  deleteBrandPicByBrandId,
  updateBrandPicByBrandId,
  postNewBrand,
  deleteBrandById,
};
