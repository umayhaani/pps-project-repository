const mongoose = require("mongoose");

const spellSchema = new mongoose.Schema({
  spell: { type: String },
  description: { type: String },
  grade: { type: String },
  level: { type: String },
});

module.exports = mongoose.model("Spell", spellSchema);
