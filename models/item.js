const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  URL: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  expiresAfter: { type: Date, required: true }
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);