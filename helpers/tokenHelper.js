const jwt = require("jsonwebtoken");
const AdminAccounts = require("../models/AdminAccounts");

const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRETKEY, {
    expiresIn: "1h",
  });
};

const updateOrCreateToken = (userId) => {
  let fcm_token;

  return AdminAccounts.findOne({
    where: { id: userId },
  })
    .then((existingToken) => {
      fcm_token = generateToken({ id: userId });

      if (existingToken) {
        return existingToken.update({
          fcm_token,
          expirationDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
      } else {
        return AdminAccounts.create({
          fcm_token,
          expirationDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
          user_id: userId,
        });
      }
    })
    .then(() => {
      console.log("Generated Token:", fcm_token);
      return fcm_token;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { generateToken, updateOrCreateToken };