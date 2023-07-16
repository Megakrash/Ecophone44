const fs = require("fs");
const knex = require("../../knex");

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
// POST NEW MODEL FOR SMARTPHONE OR TABLET

const baseRepair = [
  {
    name: "Réparation bloc écran original",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 1,
    index_id: 1,
  },
  {
    name: "Réparation bloc écran compatible",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 1,
    index_id: 2,
  },
  {
    name: "Batterie",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois.",
    price: "99",
    icon_id: 2,
    index_id: 3,
  },
  {
    name: "Réparation vitre arrière",
    text: "Temps de réparation 3 heures dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 3,
    index_id: 4,
  },
  {
    name: "Réparation connecteur de charge",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 4,
    index_id: 5,
  },
  {
    name: "Réparation caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 5,
    index_id: 6,
  },
  {
    name: "Réparation lentille caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 6,
    index_id: 7,
  },
  {
    name: "Réparation écouteur interne",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 7,
    index_id: 8,
  },
  {
    name: "Réparation caméra avant",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    icon_id: 8,
    index_id: 9,
  },
  {
    name: "Désoxydation",
    text: "Temps d'intervention de 6 heures dans notre atelier. Devis gratuit si des réparations supplémentaires sont nécéssaires. Le prix de l'intervention est déductible des réparations.",
    price: "49",
    icon_id: 9,
    index_id: 10,
  },
  {
    name: "Forfait recherche de panne",
    text: "Un devis est réalisé dans les 24 heures. Le prix de l'intervention est déductible des réparations.",
    price: "20",
    icon_id: 10,
    index_id: 11,
  },
  {
    name: "Microsoudure",
    text: "Un devis est réalisé dans les 72 heures. Le prix de l'intervention est déductible des réparations.",
    price: "99",
    icon_id: 11,
    index_id: 12,
  },
];

const postNewModel = (req, res) => {
  const { name, filename, brandId } = req.body;

  knex.transaction((trx) => {
    knex("models")
      .transacting(trx)
      .insert({ name, pic: filename, brand_id: brandId })
      .then(([modelId]) => {
        const repairs = Object.values(baseRepair);
        const repairPromises = repairs.map((repair) =>
          knex("repairs").transacting(trx).insert({
            name: repair.name,
            text: repair.text,
            price: repair.price,
            icon_id: repair.icon_id,
            index_id: repair.index_id,
            model_id: modelId,
          })
        );

        Promise.all(repairPromises)
          .then(() => {
            trx.commit();
            res.status(201).send({ message: "Model added" });
          })
          .catch((err) => {
            console.error(err);
            trx.rollback();
            res.status(500).send("Error adding repair");
          });
      })
      .catch((err) => {
        console.error(err);
        trx.rollback();
        res.status(500).send("Error adding new model");
      });
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
module.exports = {
  getModelByBrandIdForFront,
  postNewModel,
  getModelByBrandId,
  getModelById,
  updateModelById,
  deleteModelPicByModelId,
  updateModelPicByModelId,
  deleteModelById,
};
