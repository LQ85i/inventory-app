const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  URL: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  expiresAfter: {type: Date, required: true }
})

// Export model
module.exports = mongoose.model("Category", CategorySchema);