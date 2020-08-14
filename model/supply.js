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