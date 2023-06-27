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

// POST NEW MODEL FOR REFURB

const baseNewModelRefurb = {
  text: "Ecophone 44 vous propose des appareils reconditionnés par notre atelier technique. L'appareil est testé avec 28 points de contrôle, fourni avec tous les accessoires de charge et un verre trempé de protection directement installé sur l'écran. Le smartphone est révisé, nettoyé et garanti par notre service technique. Tous nos smartphones reconditionnés sont vendus débloqués et peuvent être utilisés avec n'importe quel opérateur.",
  price: "199",
};

const postNewModelRefurb = (req, res) => {
  const { name, filename, brandId } = req.body;

  knex("models")
    .insert({
      name,
      pic: filename,
      brand_id: Number(brandId),
      text: baseNewModelRefurb.text,
      price: baseNewModelRefurb.price,
    })
    .then(() => {
      res.status(201).send({ message: "Model Refurb Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new model refurb");
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

module.exports = {
  getUserByEmailWithPasswordAndPassToNext,
  postNewBrand,
  postNewModel,
  postNewModelRefurb,
  postNewRepair,
};
