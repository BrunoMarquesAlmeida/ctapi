const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: { type: Object, required: true },
  items: { type: Object, required: true },
  delivery: { type: Object, required: true },
  payment: { type: Object, required: true },
  totals: { type: Object, required: true },
  status: { type: String, required: true },
  userId: String,
  date: {
    full: { type: Date, required: true },
    short: { type: String, required: true },
  },
});

module.exports = mongoose.model("Order", orderSchema);
