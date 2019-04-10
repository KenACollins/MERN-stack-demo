// Uppercase 'User.js' file name because it returns a Mongoose Model class.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);