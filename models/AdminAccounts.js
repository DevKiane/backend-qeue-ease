const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const AdminAccounts = sequelizeConnect.define(
    "admin",
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
    email_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo: {
			type: Sequelize.STRING,
			allowNull: true,
    },
    password: {
			type: Sequelize.STRING,
			allowNull: false,
			},
	fcm_token: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status:{
		type: Sequelize.Sequelize.ENUM("Available", "Not Available", "On hold"),
		allowNull: false,
		defaultValue: "Not Available"
	},
	admin_remarks:{
		type: Sequelize.STRING,
		allowNull: true,
	}
    },
		{
			tableName: "admin",
			timestamps: true,
		}
);

module.exports = AdminAccounts;