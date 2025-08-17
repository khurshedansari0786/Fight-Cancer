const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: String,
  donationAmount: Number,
  donationMessage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);
