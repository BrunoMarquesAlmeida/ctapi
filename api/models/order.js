const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: { type: Object, required: true },
  items: { type: Object, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
