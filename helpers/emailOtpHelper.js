const emailTemplates = require("./emailTemplate");
const generateRandomCode = require("../helpers/randomCodeGenerator");
const transporter = require("./transporter");

const createVerificationEmail = (clientEmail, verificationCode) => {
  const htmlMessage = emailTemplates.OPTTemplate(verificationCode);

  return {
    from: process.env.EMAIL_USER,
    to: clientEmail,
    subject: "Verification Code",
    html: htmlMessage,
    verificationCode,
  };
};

module.exports = { transporter, createVerificationEmail };
