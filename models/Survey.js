// This is the model class which defines what a survey is in the surveys collection we want to create.
// A survey includes a subdocument collection of recipient records defined in Recipient.js file.
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],    // Array of recipient subdocuments.
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // Establish relationship between survey and user.
    dateSent: Date,
    lastResponded: Date
});

// Tell Mongoose to create our surveys collection with the surveySchema schema.
mongoose.model('surveys', surveySchema);