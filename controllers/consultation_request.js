const ConsultationRequest = require("../models/ConsultationRequest");

exports.createConsultation = (req, res, next) => {
    const { 
        student_sr_code, 
        category_1, 
        category_2, 
        subcategory_1, 
        subcategory_2, 
        professor_1, 
        professor_2, 
        remarks_1, 
        remarks_2 } = req.body;

    ConsultationRequest.findOne({
        where: { student_sr_code: student_sr_code, professor_1: professor_1, category_1:category_1, subcategory_1:subcategory_1  }
    })
    .then((data) => {
        if (data) {
            return res.status(401).json({
                success: false,
                message: "Consultation request already sent",
            });
        }
        return ConsultationRequest.create({
            student_sr_code,
            category_1,
            category_2,
            subcategory_1,
            subcategory_2,
            professor_1,
            professor_2,
            remarks_1,
            remarks_2
        });
    })
    .then((createdConsultation) => {
        if (!createdConsultation) 
            return res.status(401).json({
                success: false,
                message: "Consultation request cannot create",
            });; 
        res.status(201).json({
            success: true,
            message: "Consultation request has been created",
            consultation: createdConsultation
        });
    })
    .catch((err) => {
        next(err);
    });
};


exports.editConsultation = (req, res, next) => {
    const { consultationId } = req.params; // Extract the consultationId correctly
    const { student_sr_code, category_1, category_2, subcategory_1, subcategory_2, professor_1, professor_2, remarks_1, remarks_2, consultation_status } = req.body;

    ConsultationRequest.findOne({
        where: { id: consultationId }
    })
    .then((consultation) => {
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "Consultation request not found",
            });
        }

        return consultation.update({
            student_sr_code: student_sr_code || consultation.student_sr_code,
            category_1: category_1 || consultation.category_1,
            category_2: category_2 || consultation.category_2,
            subcategory_1: subcategory_1 || consultation.subcategory_1,
            subcategory_2: subcategory_2 || consultation.subcategory_2,
            professor_1: professor_1 || consultation.professor_1,
            professor_2: professor_2 || consultation.professor_2,
            remarks_1: remarks_1 || consultation.remarks_1,
            remarks_2: remarks_2 || consultation.remarks_2,
            consultation_status: consultation_status || consultation.consultation_status
        });
    })
    .then((updatedConsultation) => {
        res.status(200).json({
            success: true,
            message: "Consultation request has been updated",
            consultation: updatedConsultation
        });
    })
    .catch((err) => {
        next(err);
    });
};
