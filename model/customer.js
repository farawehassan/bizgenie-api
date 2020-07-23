const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }, 
  reports: [
    { 
      report: { type: Schema.Types.Mixed, required: true },
      totalAmount: { type: Number, required: true },
      paymentMade: { type: Number, required: true },
      paid: { type: Boolean, required: true },
      soldAt: { type: String, required: true },
      dueDate: { type: String },
      paymentReceivedAt: String,
    }
  ],
  createdAt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Customer', customerSchema);