const express = require("express");
const { body, param} = require("express-validator");
const validation = require("../middlewares/routeValidation");
const { createConsultation, editConsultation } = require("../controllers/consultation_request");
const StudentAccount = require("../models/StudentAccounts");
const AdminAccounts = require("../models/AdminAccounts");
const ConsultationRequest = require("../models/ConsultationRequest");

const router = express.Router();

router.post(
    "/create",
    [
        body("student_sr_code").notEmpty()
        .custom((value, { req }) => {
            return StudentAccount.findOne({
              where: {
                sr_code: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid SR-Code. Student is not registered");
              }
            });
          }),
        body("category_1").notEmpty(),
        body("category_2").optional(),
        body("subcategory_1").notEmpty(),
        body("subcategory_2").optional(),
        body("professor_1").notEmpty()
        .custom((value, { req }) => {
            return AdminAccounts.findOne({
              where: {
                name: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid Professor.");
              }
              if (user.status === "Not Available" ){
                return Promise.reject("This professor is not available. You cannot create a consultation request.");
              }
            });
          }),
        body("professor_2").optional()
         .custom((value, { req }) => {
            return AdminAccounts.findOne({
              where: {
                name: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid Professor.");
              }
              if (user.status === "Not Available"){
                return Promise.reject("This professor is not available. You cannot create a consultation request.");
              }
            });
          }),
        body("remarks_1").optional(),
        body("remarks_2").optional(),
        body("consultation_status").optional().isIn(["in_queue", "accepted", "completed", "declined", "terminated"]),
    ],
    validation,
    createConsultation
);


router.put(
    "/edit/:consultationId",
    [
        param("consultationId").notEmpty(),
        // .custom((value, { req }) => {
        //     return ConsultationRequest.findOne({
        //       where: {
        //         id: value,
        //       },
        //     }).then((user) => {
        //       if (!user) {
        //         return Promise.reject("Consultation request not found");
        //       }
        //     });
        //   }),
        body("student_sr_code").optional()
        .custom((value, { req }) => {
            return StudentAccount.findOne({
              where: {
                sr_code: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid SR-Code. Student is not registered");
              }
            });
          }),
        body("category_1").optional(),
        body("category_2").optional(),
        body("subcategory_1").optional(),
        body("subcategory_2").optional(),
        body("professor_1").optional()
        .custom((value, { req }) => {
            return AdminAccounts.findOne({
              where: {
                name: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid Professor.");
              }
            });
          }),
        body("professor_2").optional()
         .custom((value, { req }) => {
            return AdminAccounts.findOne({
              where: {
                name: value,
              },
            }).then((user) => {
              if (!user) {
                return Promise.reject("Invalid Professor.");
              }
            });
          }),
        body("remarks_1").optional(),
        body("remarks_2").optional(),
        body("consultation_status").optional().isIn(["in_queue", "accepted", "completed", "declined", "terminated"]),
    ],
    validation,
    editConsultation
);

module.exports = router;
