const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Semester', semesterSchema)