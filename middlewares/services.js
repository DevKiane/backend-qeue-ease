const Sequelize = require("sequelize");
const schedule = require("node-schedule");

const VerificationCodes = require("../models/VerificationCodes");

const errorHandler = require("../util/errorHandler");

const deleteExpiredTokens = schedule.scheduleJob("* * * * *", async () => {
  try {
    const currentTimestamp = new Date();
    await VerificationCodes.update( { is_available: false},{
      where: {
        updatedAt: {
        //   [Sequelize.Op.lt]: new Date(currentTimestamp - 2 * 60 * 60 * 1000), // 2 hours ago
            [Sequelize.Op.lte]: new Date(currentTimestamp - 5 * 60 * 1000), // 5 minute ago
        },
      },
    });
    console.log("Verification code Updated");
  } catch (err) {
    errorHandler(`Deleting token error: ${err}, 500`);
  }
});

deleteExpiredTokens;

module.exports = deleteExpiredTokens;
