const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const StudentAccount = sequelizeConnect.define(
    "student",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sr_code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            index: true, // Add index to improve performance for foreign key constraint
        },
        email_address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fcm_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "student",
        timestamps: true,
    }
);

module.exports = StudentAccount;
