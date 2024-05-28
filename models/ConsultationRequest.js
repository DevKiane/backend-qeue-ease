const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const StudentAccount = require("./StudentAccounts");

const ConsultationRequest = sequelizeConnect.define(
    "consultation_request",
    {
    id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
    },
    student_sr_code: {
			type: Sequelize.STRING,
			allowNull: false,
    },
	category_1: {
		type: Sequelize.STRING,
		allowNull: false,
	},
    category_2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    category_2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
	subcategory_1: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    subcategory_2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    professor_1: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    professor_2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    remarks_1: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    remarks_2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    consulation_status: {
        type: Sequelize.ENUM("in_queue", "accepted", "completed", "declined", "terminated"),
        allowNull: true,
        defaultValue: "in_queue"
    },
    qr_code:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    queue_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
    },
	{
		tableName: "consultation_request",
		timestamps: true,
        hooks: {
            beforeCreate: async (consultationRequest, options) => {
                const latestConsultation = await ConsultationRequest.findOne({
                    where: {
                        professor_1: consultationRequest.professor_1
                    },
                    order: [['createdAt', 'DESC']]
                });
                if (latestConsultation) {
                    consultationRequest.queue_number = latestConsultation.queue_number + 1;
                } else {

                    consultationRequest.queue_number = 1;
                }
            }
        }
	}
);

ConsultationRequest.belongsTo(StudentAccount, { foreignKey: 'student_sr_code', targetKey: 'sr_code' });


module.exports = ConsultationRequest;