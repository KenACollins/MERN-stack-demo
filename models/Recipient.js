// This is the model class which defines a recipient subdocument within a survey document.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

// Rather than tell Mongoose to create separate recipients collection, 
// we export our schema so it can become a subdocument collection of the survey document.
module.exports = recipientSchema;