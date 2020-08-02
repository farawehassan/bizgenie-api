const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productHistorySchema = new Schema({
  products: [
    { 
      productName: { type: String, required: true },
      initialQty: { type: Number, required: true },
      currentQty: { type: Number, required: true }, 
      collectedAt: { type: String, required: true }, 
    }
  ],
  createdAt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('ProductHistory', productHistorySchema);