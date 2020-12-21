const mongoose = require("mongoose");

//const uniqueValidator = require("mongoose-unique-validator");

const signupSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, required: true },
});

//signupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Signup", signupSchema);
