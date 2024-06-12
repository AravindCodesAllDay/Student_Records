const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    fatherPhone: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true
    },
    motherPhone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    tenthPercentage: {
        type: Number,
        required: true
    },
    tenthMarksheet: {
        type: marksheetSchema,
        required: true
    },
    twelthPercentage: {
        type: Number,
    },
    twelthMarksheet: {
        type: marksheetSchema
    },
    polytechnicPercentage: {
        type: Number,
    },
    polytechnicMarksheet: {
        type: marksheetSchema
    },
    motherOccupation: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    quota: {
        type: String,
        required: true
    },
    emisNo: {
        type: String,
        required: true
    },
    aadhaarNo: {
        type: String,
        required: true
    },
    professionalphoto: {
        type: String,
        required: true
    },
    semesterDetails: {
        type: Array,
        ref: 'marketSheet'
    }

})

module.exports = mongoose.model("Student", studentSchema);