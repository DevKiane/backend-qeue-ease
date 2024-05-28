const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const errorHandler = require("../util/errorHandler");

const ClientUserTokens = require("../models/ClientUserTokens");
const ClientsUsers = require("../models/Clients-Users")

dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return errorHandler("Not authenticated", 401);
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    console.log("Decoded Token:", decodedToken);

    if (!decodedToken) {
      return errorHandler("Not Authenticated", 401);
    }

    // const clientUserToken = await ClientsUsers.findByPk(decodedToken.id);

    const clientUserToken = await ClientUserTokens.findOne({
      where: 
      {
      client_id: decodedToken.id
      }
    });


    if (!clientUserToken) {
      return errorHandler("ClientUser token not valid.", 401);
    }

    req.id = decodedToken.id;
    console.log("re1", decodedToken.id);
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};