const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ name: {type:String, required:[true, 'You need a username.']}, email: { type: String, unique: true }, password_hash: {type:String, required:[true, 'You need a password.']},});

module.exports = userSchema