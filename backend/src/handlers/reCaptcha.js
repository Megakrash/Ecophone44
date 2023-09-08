const axios = require("axios");

const verifyRecaptchaToken = async (req, res, next) => {
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    if (response.data.success) {
      next();
    } else {
      res.status(500).send("reCAPTCHA verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
    next(error);
  }
};

module.exports = {
  verifyRecaptchaToken,
};
