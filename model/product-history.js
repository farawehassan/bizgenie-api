const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productHistorySchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  products: [
    {  
      initialQty: { type: Number, required: true },
      qtyReceived: { type: Number, required: true }, 
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