const fs = require("fs");
const database = require("../../database");

const deleteBrandPicByBrandId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pic } = req.body;
  database
    .query(`UPDATE brands set pic = NULL WHERE id = ?;`, [Number(id)])
    .then(() => {
      try {
        if (fs.existsSync(`public/assets/images/marques/${pic}`)) {
          fs.unlink(`public/assets/images/marques/${pic}`, (err) => {
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

// const deleteBrandById = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   database
//     .query(`UPDATE brands set pic = NULL WHERE id = ?;`, [Number(id)])
//     .then(() => {
//       try {
//         if (fs.existsSync(`public/assets/images/marques/${pic}`)) {
//           fs.unlink(`public/assets/images/marques/${pic}`, (err) => {
//             if (err) {
//               console.error(err);
//             }
//           });
//           res.sendStatus(204);
//         } else {
//           console.warn("file doesn't exists!");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     })
//     .catch((err) => console.error(err));
// };

module.exports = {
  deleteBrandPicByBrandId,
  // deleteBrandById,
};
