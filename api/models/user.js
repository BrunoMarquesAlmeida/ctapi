const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  address: {
    firstName: String,
    lastName: String,
    street: String,
    zip: String,
    city: String,
    email: String,
    phone: String,
    NIF: String,
  },
  wishlist: Array,
});

module.exports = mongoose.model("User", userSchema);
