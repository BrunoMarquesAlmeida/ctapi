const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  details: {
    firstName: String,
    lastName: String,
    address: String,
    zip: String,
    city: String,
    email: String,
    phone: String,
    NIF: String,
  },
  wishlist: Array,
});

module.exports = mongoose.model("Product", productSchema);
