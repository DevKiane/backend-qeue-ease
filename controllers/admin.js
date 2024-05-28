const AdminAccounts = require("../models/AdminAccounts");
const ConsultationRequest = require("../models/ConsultationRequest");
const { Op, Sequelize } = require("sequelize");
const StudentAccount = require("../models/StudentAccounts");
const emailHelper = require("../helpers/emailHelper");
const { updateOrCreateToken } = require("../helpers/tokenHelper");

exports.findAllAdmin = (req, res, next) => {
  AdminAccounts.findAll()
    .then((admins) => {
      if (!admins || admins.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No admin accounts found",
        });
      }

      const adminList = admins.map((admin) => ({
        id: admin.id,
        name: admin.name,
        email_address: admin.email_address,
        status: admin.status,
        remarks: admin.admin_remarks,
        photo: admin.photo,
      }));

      res.status(200).json({
        success: true,
        message: "Admin accounts found",
        admins: adminList,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.findByAdmin = (req, res, next) => {
  const { adminId } = req.params;

  AdminAccounts.findByPk(adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Professor not found",
        });
      }

      const professorName = admin.name;

      ConsultationRequest.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { professor_1: professorName },
                { professor_2: professorName },
              ],
            },
            { queue_number: { [Op.ne]: 0 } },
          ],
        },
        include: [
          {
            model: StudentAccount,
            attributes: ["name"],
            where: {
              sr_code: Sequelize.col("consultation_request.student_sr_code"),
            },
          },
        ],
        attributes: [
          "id",
          "queue_number",
          "student_sr_code",
          "category_1",
          "subcategory_1",
          "remarks_1",
        ],
        order: [["createdAt", "ASC"]],
      })
        .then((consultationRequests) => {
          const consultationRequestsJSON = consultationRequests.map(
            (request) => ({
              consultation_request: {
                queue_number: request.queue_number,
                name: request.student ? request.student.name : null,
                student_sr_code: request.student_sr_code,
                category_1: request.category_1,
                subcategory_1: request.subcategory_1,
                remarks_1: request.remarks_1,
                consultation_id: request.id,
              },
            })
          );

          res.status(200).json({
            success: true,
            message: "Consultation requests found",
            admin_account: {
              name: professorName,
            },
            consultationRequests: consultationRequestsJSON,
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

exports.findByAdminHistory = (req, res, next) => {
  const { adminId } = req.params;

  AdminAccounts.findByPk(adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Professor not found",
        });
      }

      const professorName = admin.name;

      ConsultationRequest.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { professor_1: professorName },
                { professor_2: professorName },
              ],
            },
            { queue_number: 0 },
          ],
        },
        include: [
          {
            model: StudentAccount,
            attributes: ["name"],
            where: {
              sr_code: Sequelize.col("consultation_request.student_sr_code"),
            },
          },
        ],
        attributes: [
          "student_sr_code",
          "category_1",
          "subcategory_1",
          "remarks_1",
          "createdAt",
        ],
        order: [["createdAt", "ASC"]],
      })
        .then((consultationRequests) => {
          const consultationRequestsJSON = consultationRequests.map(
            (request) => ({
              consultation_request: {
                name: request.student ? request.student.name : null,
                student_sr_code: request.student_sr_code,
                category_1: request.category_1,
                subcategory_1: request.subcategory_1,
                remarks_1: request.remarks_1,

                date: new Date(request.createdAt).toLocaleDateString(),
                time: new Date(request.createdAt).toLocaleTimeString(),
              },
            })
          );

          res.status(200).json({
            success: true,
            message: "Consultation history found",
            admin_account: {
              name: professorName,
            },
            consultationRequests: consultationRequestsJSON,
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

exports.adminConsultation = (req, res, next) => {
  const { consultationId } = req.params;
  const { response, remarks } = req.body;

  ConsultationRequest.findOne({
    where: { id: consultationId },
    include: [{ model: StudentAccount, attributes: ["email_address"] }],
  })
    .then((consultation) => {
      if (!consultation) {
        return res.status(404).json({
          success: false,
          message: "Consultation not found",
        });
      }
      if (consultation.queue_number === 0) {
        return res.status(400).json({
          success: false,
          message: "This consultation request is on your history",
        });
      }

      const studentEmail = consultation.student.email_address;
      const consultationDetails = {
        category_1: consultation.category_1,
        subcategory_1: consultation.subcategory_1,
        remarks_1: consultation.remarks_1,
        professor_1: consultation.professor_1,
      };

      // Update consultation status and queue number
      consultation.consulation_status =
        response === "accept" ? "accepted" : "declined";
      const originalQueueNumber = consultation.queue_number;
      consultation.queue_number = 0;

      return consultation
        .save()
        .then(() => {
          // Adjust the queue numbers of other consultation requests
          return ConsultationRequest.findAll({
            where: {
              professor_1: consultation.professor_1,
              queue_number: { [Op.gt]: originalQueueNumber },
              id: { [Op.ne]: consultationId }, // Exclude the current consultation
            },
          });
        })
        .then((requests) => {
          const updatePromises = requests.map((request) => {
            request.queue_number -= 1;
            return request.save();
          });
          return Promise.all(updatePromises);
        })
        .then(() => {
          // Send the email
          return emailHelper.adminResponse(
            studentEmail,
            response,
            remarks,
            consultationId,
            consultationDetails
          );
        })
        .then(() => {
          res.status(200).json({
            success: true,
            message: `Consultation ${response} email sent successfully`,
          });
        });
    })
    .catch((error) => {
      next(error);
    });
};

exports.adminStatus = (req, res, next) => {
  const { status, remarks } = req.body;
  const { adminId } = req.params;

  AdminAccounts.findOne({
    where: { id: adminId },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Professor not found",
        });
      }

      (data.status = status), (data.admin_remarks = remarks), data.save();
    })
    .then(() => {
      return res.status(404).json({
        success: true,
        message: "Status has been Updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.adminLogin = (req, res, next) => {
  const { email_address, password } = req.body;
  let userData;

  AdminAccounts.findOne({
    where: {email_address: email_address, password:password}
  })
  .then(data => {
    if(!data){
      return res.status(200).json({
        success: false,
        message: "Admin Account Invalid."
      })
    }
    userData= data;
    return updateOrCreateToken(data.id);
  })
  .then((token) => {
    return res.status(200).json({
      success: true,
      token,
      admin_info: userData,
    });
  })
  .catch((err) => {
    next(err);
  });
};

//admin status with email notif
//   exports.adminStatus = (req, res, next) => {
//     const { status, remarks } = req.body;
//     const { adminId } = req.params;

//     AdminAccounts.findOne({
//         where: { id: adminId }
//     })
//     .then((admin) => {
//         if (!admin) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Professor not found"
//             });
//         }

//         return ConsultationRequest.findAll({
//             where: {
//                 [Op.or]: [
//                     { professor_1: admin.name },
//                     { professor_2: admin.name }
//                 ],
//                 queue_number: { [Op.ne]: 0 }
//             },
//             include: [{
//                 model: StudentAccount,
//                 attributes: ['email_address']
//             }]
//         })
//         .then((consultationRequests) => {
//             const studentEmails = consultationRequests.map((request) => request.student?.email_address).filter(email => email);
//             return Promise.all(studentEmails.map((email) => emailHelper.adminTerminate(email, status, remarks)));
//         });
//     })
//     .then(() => {
//         return res.status(200).json({
//             success: true,
//             message: "Status has been updated and emails have been sent"
//         });
//     })
//     .catch((error) => {
//         next(error);
//     });
// };
