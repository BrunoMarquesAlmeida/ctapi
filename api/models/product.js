const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  precos: { type: Object, required: true },
});

module.exports = mongoose.model("Product", productSchema);
