const knex = require("../../knex");

// -------------------------------
// ----------- Users -------------
// -------------------------------

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  knex("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// -------------------------------
// ----------- Brands -----------
// -------------------------------
// POST NEW BRAND
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

// -------------------------------
// ----------- Models -----------
// -------------------------------

// POST NEW MODEL

const baseRepair = [
  {
    name: "Réparation bloc écran original",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 1,
  },
  {
    name: "Réparation bloc écran compatible",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 2,
  },
  {
    name: "Batterie",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois.",
    price: "99",
    index_id: 3,
  },
  {
    name: "Réparation vitre arrière",
    text: "Temps de réparation 3 heures dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 4,
  },
  {
    name: "Réparation connecteur de charge",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 5,
  },
  {
    name: "Réparation caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 6,
  },
  {
    name: "Réparation lentille caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 7,
  },
  {
    name: "Réparation écouteur interne",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 8,
  },
  {
    name: "Réparation caméra avant",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: "99",
    index_id: 9,
  },
  {
    name: "Désoxydation",
    text: "Temps d'intervention de 6 heures dans notre atelier. Devis gratuit si des réparations supplémentaires sont nécéssaires. Le prix de l'intervention est déductible des réparations.",
    price: "49",
    index_id: 10,
  },
  {
    name: "Forfait recherche de panne",
    text: "Un devis est réalisé dans les 24 heures. Le prix de l'intervention est déductible des réparations.",
    price: "20",
    index_id: 11,
  },
  {
    name: "Microsoudure",
    text: "Un devis est réalisé dans les 72 heures. Le prix de l'intervention est déductible des réparations.",
    price: "99",
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

// -------------------------------
// ----------- Repairs -----------
// -------------------------------
const postNewRepair = (req, res) => {
  const { name, text, price, modelId } = req.body;

  knex("repairs")
    .insert({
      name,
      text,
      price: Number(price),
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

module.exports = {
  getUserByEmailWithPasswordAndPassToNext,
  postNewBrand,
  postNewModel,
  postNewRepair,
};
