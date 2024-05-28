const express = require("express");
const { body, param} = require("express-validator");
const validation = require("../middlewares/routeValidation");
const { findByAdmin, findAllAdmin, findByAdminHistory, adminConsultation, adminLogin, adminStatus} = require("../controllers/admin");
const StudentAccount = require("../models/StudentAccounts");
const AdminAccounts = require("../models/AdminAccounts");
const ConsultationRequest = require("../models/ConsultationRequest");

const router = express.Router();

router.get(
    "/find-all-admin",
    findAllAdmin
);

router.get(
    "/:adminId/find-all",
    findByAdmin
);

router.get(
    "/:adminId/find-all-history",
    findByAdminHistory
);

router.put(
    "/update-status/:adminId",
    [
        body("status").notEmpty(),
        body("remarks").optional()
    ],
    validation,
    adminStatus
);

router.post(
    "/login",
    [
        body("email_address").notEmpty(),
        body("password").optional()
    ],
    validation,
    adminLogin
);


router.put(
    "/:consultationId",
    [
        body("response").notEmpty().custom((value, { req }) => {
            if (value !== 'accept' && (value !== 'decline' || !req.body.remarks)) {
                throw new Error('Invalid response. Response must be "accept" or "decline", and if decline, remarks must not be empty.');
            }
            return true;
        }),
        body("remarks").optional(),
    ],
    validation,
    adminConsultation
);


module.exports = router;