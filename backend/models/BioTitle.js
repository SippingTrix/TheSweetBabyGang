const mongoose = require("mongoose");

const BioTitleSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model("BioTitle", BioTitleSchema);
