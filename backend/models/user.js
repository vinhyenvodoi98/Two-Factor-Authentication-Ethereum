const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  accounts: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
