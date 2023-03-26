const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotel: String,
  room: String,
  stay: Number,
  manageParking: String,
  finalCost: Number,
});

module.exports = mongoose.model("driver-hotel", hotelSchema);
