const express = require("express");
const router = express.Router();

const consultationRequestRoute = require("./consultation_request");
const adminRoute = require("./admin");

router.use("/consultation-request", consultationRequestRoute);
router.use("/admin", adminRoute);

module.exports = router;
