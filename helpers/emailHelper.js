const transporter = require("../helpers/transporter");
const emailTemplates = require("../helpers/emailTemplate");
// const generateRandomCode = require("../helpers/randomCodeGenerator");

const createVerificationEmail = (clientEmail, verificationCode) => {
  const htmlMessage =
    emailTemplates.createVerificationEmailTemplate(verificationCode);

  return {
    from: process.env.EMAIL_USER,
    to: clientEmail,
    subject: "Event",
    html: htmlMessage,
    verificationCode,
  };
};

// const createPlayerPaymentEmail = (
//   emailAddress,
//   referenceNum,
//   date,
//   eventName,
//   location,
//   amountPaid
// ) => {
//   const htmlMessage = emailTemplates.createPlayerPaymentEmailTemplate(
//     emailAddress,
//     referenceNum,
//     date,
//     eventName,
//     location,
//     amountPaid
//   );
//   return {
//     from: process.env.EMAIL_USER,
//     to: emailAddress,
//     subject: "Laro Payment Confirmation",
//     html: htmlMessage,
//     emailAddress,
//     referenceNum,
//     date,
//     eventName,
//     location,
//     amountPaid,
//   };
// };

// const createPaymentEmail = (
//   emailAddress,
//   referenceNum,
//   date,
//   eventName,
//   no_of_quarter,
//   min_per_quarter,
//   no_of_player,
//   location,
//   courtOwner,
//   amountPaid
// ) => {
//   const htmlMessage = emailTemplates.createPaymentEmailTemplate(
//     // verificationCode,
//     emailAddress,
//     referenceNum,
//     date,
//     eventName,
//     no_of_quarter,
//     min_per_quarter,
//     no_of_player,
//     location,
//     courtOwner,
//     amountPaid
//   );

//   return {
//     from: process.env.EMAIL_USER,
//     to: emailAddress,
//     subject: "Laro - Payment Confirmation",
//     html: htmlMessage,
//     emailAddress,
//     referenceNum,
//     date,
//     eventName,
//     no_of_quarter,
//     min_per_quarter,
//     no_of_player,
//     location,
//     courtOwner,
//     amountPaid,
//   };
// };

const inviteFriend = (email_address, eventLink) => {
  const htmlMessage = emailTemplates.createInvitationEmailTemplate(eventLink);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email_address,
    subject: "Invitation to Event",
    html: htmlMessage,
  };

  return transporter.sendMail(mailOptions);
};

const adminResponse = (email_address, response, remarks, consultationId, consultationDetails) => {
  const htmlMessage = emailTemplates.createConsultationEmailTemplate(response, remarks, consultationId, consultationDetails);

  const subject = response === "accept" ? "Approved Consultation Request" : "Declined Consultation Request";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email_address,
    subject: subject,
    html: htmlMessage,
  };

  return transporter.sendMail(mailOptions);
};

const adminTerminate = (email_address, response, remarks) => {
  const htmlMessage = emailTemplates.createTerminationEmailTemplate(response, remarks);

  const subject = "Notice of Queue Termination"
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email_address,
    subject: subject,
    html: htmlMessage,
  };

  return transporter.sendMail(mailOptions);
};


module.exports = {
  transporter,
  inviteFriend,
  adminResponse,
  adminTerminate
};
