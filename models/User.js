// This is the model class which defines what a user is in the users collection we want to create.
// Uppercase 'User.js' file name because it returns a Mongoose Model class.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

// Tell Mongoose to create our users collection with the userSchema schema.
mongoose.model('users', userSchema);