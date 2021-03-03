const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  precos: { type: Object, required: true },
  description: Array,
  categorias: { type: Object, required: true },
  specs: Array,
  img: Array,
  ribbons: Object,
  vendas: Number,
});

module.exports = mongoose.model("Product", productSchema);
