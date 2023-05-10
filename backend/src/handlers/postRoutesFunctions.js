const database = require("../../database");

// POST NEW BRAND
const postNewBrand = (req, res) => {
  const { name, filename, isSmart } = req.body;

  database
    .query("INSERT INTO brands(name, pic, is_smart ) VALUES (?, ?, ?);", [
      name,
      filename,
      Number(isSmart),
    ])
    .then(() => {
      res.status(201).send({ message: "Brand Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error add new Brand");
    });
};

// POST NEW MODEL

const baseRepair = [
  {
    name: "Réparation bloc écran original",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 1,
  },
  {
    name: "Réparation bloc écran compatible",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 2,
  },
  {
    name: "Batterie",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois.",
    price: 99,
    index_id: 3,
  },
  {
    name: "Réparation vitre arrière",
    text: "Temps de réparation 3 heures dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 4,
  },
  {
    name: "Réparation connecteur de charge",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 5,
  },
  {
    name: "Réparation caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 6,
  },
  {
    name: "Réparation lentille caméra arrière",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 7,
  },
  {
    name: "Réparation écouteur interne",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 8,
  },
  {
    name: "Réparation caméra avant",
    text: "Temps de réparation 1 heure dans notre atelier. Garantie de 3 mois (hors casse).",
    price: 99,
    index_id: 9,
  },
  {
    name: "Désoxydation",
    text: "Temps d'intervention de 6 heures dans notre atelier. Devis gratuit si des réparations supplémentaires sont nécéssaires. Le prix de l'intervention est déductible des réparations.",
    price: 99,
    index_id: 10,
  },
  {
    name: "Forfait recherhce de panne",
    text: "Un devis est réalisé dans les 24 heures. Le prix de l'intervention est déductible des réparations.",
    price: 99,
    index_id: 11,
  },
  {
    name: "Microsoudure",
    text: "Un devis est réalisé dans les 72 heures. Le prix de l'intervention est déductible des réparations.",
    price: 99,
    index_id: 10,
  },
];

const postNewModel = (req, res) => {
  const { name, filename, brandId } = req.body;
  database
    .query("INSERT INTO models(name, pic, brand_id) VALUES (?, ?, ?);", [
      name,
      filename,
      brandId,
    ])
    .then(([result]) => {
      res.status(201).send({ message: "Model added" });
      const modeleId = result.insertId;
      const repairs = Object.values(baseRepair);
      for (const repair of repairs) {
        database
          .query(
            "INSERT INTO repairs(name, text, price, index_id, model_id) VALUES (?, ?, ?, ?, ?);",
            [repair.name, repair.text, repair.price, repair.index_id, modeleId]
          )
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error adding repair");
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding new model");
    });
};

module.exports = {
  postNewBrand,
  postNewModel,
};
