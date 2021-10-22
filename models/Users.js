const { model, Schema } = require("mongoose");

//Mongo Schema for Users data.
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  createdAt: String,
});

module.exports = model("Users", userSchema);