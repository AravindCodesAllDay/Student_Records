const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    duration: {
        type: String,
        required: true
    },
    semesterDetails: {
        type: Array,
        ref: 'semester'
    },
    totalStudents: {
        type: Number
    }
})

module.exports = mongoose.model('Batch', batchSchema);  