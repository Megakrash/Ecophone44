const nodemailer = require("nodemailer");

const sendEmail = (emailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const sendConfirmationEmail = (req, res) => {
  const {
    email,
    startDate,
    selectedRepairs,
    modelName,
    totalCardPrice,
    formDetails,
    brandName,
  } = req.body;

  const repairNames = selectedRepairs.map((repair) => repair.name).join(", ");

  const mailOptions1 = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirmation de votre rendez-vous chez Ecophone 44",
    html: `<!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Email confirmation RDV</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom 1px solid #eee">
          <p>Cher client,</p>
          <p>Votre rendez vous chez Ecophone 44 est confirmé pour la réparation de votre ${modelName}.</p>
          <p>Votre rendez-vous : ${startDate}.</p>
          <p>Pour la ou les réparation(s) : ${repairNames}.</p>
          <p>Coût total : ${totalCardPrice}.00€.</p>
          <div style="float:left;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Ecophone 44</p>
            <p>2 rue deurbroucq</p>
            <p>44000 Nantes</p>
            <p>02 52 10 37 71</p>
            <p>contact@ecophone44.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  const mailOptions2 = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: "Nouveau RDV client",
    html: `<!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Email confirmation RDV</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom 1px solid #eee">
          <p>Nouveau RDV réparation :</p>
          <p>Nom : ${formDetails.lastName}</p>
          <p>Prénom : ${formDetails.firstName}</p>
          <p>Email : ${email}</p>
          <p>Téléphone : ${formDetails.phoneNumber}</p>
          <p>Marque : ${brandName}</p>
          <p>Modèle : ${modelName}.</p>
          <p>Date : ${startDate}.</p>
          <p>Réparation(s) : ${repairNames}.</p>
          <p>Coût total : ${totalCardPrice}.00€.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  Promise.all([sendEmail(mailOptions1), sendEmail(mailOptions2)])
    .then(() => {
      res.status(200).send("Emails envoyés avec succès");
    })
    .catch(() => {
      res.status(500).send("Une erreur s'est produite");
    });
};
const sendReservationEmail = (req, res) => {
  const { modelName, price, formDetails } = req.body;

  const mailOptions1 = {
    from: process.env.MAIL_USER,
    to: formDetails.email,
    subject: "Réservation de votre reconditionné chez Ecophone 44",
    html: `<!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Réservation confirmée</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom 1px solid #eee">
          <p>Cher client,</p>
          <p>La réservation de votre smartphone reconditionné par Ecophone 44 est confirmée.</p>
          <p>Modèle choisi : ${modelName}.</p>
          <p>Prix : ${price}.00€.</p>
          <p>Cette réservation est valable 48H. Passé ce délai, l'appareil sera remis à disposition sur internet ainsi qu'en boutique.</p>

          <div style="float:left;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Ecophone 44</p>
            <p>2 rue deurbroucq</p>
            <p>44000 Nantes</p>
            <p>02 52 10 37 71</p>
            <p>contact@ecophone44.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  const mailOptions2 = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: "Nouvelle réservation reconditionné",
    html: `<!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Email Réservation reconditionné</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom 1px solid #eee">
          <p>Nouvelle réservation :</p>
          <p>Nom : ${formDetails.lastName}</p>
          <p>Prénom : ${formDetails.firstName}</p>
          <p>Email : ${formDetails.email}</p>
          <p>Téléphone : ${formDetails.phoneNumber}</p>
          <p>Modèle : ${modelName}.</p>
          <p>Prix : ${price}.00€.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  Promise.all([sendEmail(mailOptions1), sendEmail(mailOptions2)])
    .then(() => {
      res.status(200).send("Emails envoyés avec succès");
    })
    .catch(() => {
      res.status(500).send("Une erreur s'est produite");
    });
};

module.exports = {
  sendConfirmationEmail,
  sendReservationEmail,
};
