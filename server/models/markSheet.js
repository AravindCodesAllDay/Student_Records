const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('marksheetSchema', marksheetSchema);;