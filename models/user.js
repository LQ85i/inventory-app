const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, maxLength: 32, required: true },
  password: { type: String, maxLength: 128, required: true },
  expiresAfter: { type: Date, required: true }
});

// Export model
module.exports = mongoose.model("User", UserSchema);