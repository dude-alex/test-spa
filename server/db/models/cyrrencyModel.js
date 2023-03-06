const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const cyrrencySchema = new Schema({
  name: { type: String, required: true },
  value: { type: String },
});

module.exports = Currency = mongoose.model("cyrrency", cyrrencySchema);
