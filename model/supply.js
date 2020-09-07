const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplySchema = new Schema({
  dealer: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },  
  foc: {
    type: Boolean,
    required: true
  },
  focRate: String,
  focPayment: Number,
  notes: String,  
  received: {
    type: Boolean,
    required: true
  },  
  createdAt: {
    type: String,
    required: true
  },  
  receivedAt: String
});

module.exports = mongoose.model('Supply', supplySchema);