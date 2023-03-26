const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carCompany: String,
  carColor: String,
  carModel: String,
  carType: String,
  carOwner: String,
  carImg: String,
  numPlate: String,
  insuranceValidity: String,
  fuelType: String,
  feature: String,
  pickUpLocation: String,
  dropLocation: String,
  pickUpTime: String,
  pickUpDate: String,
  dropDate: String,
  passangerCapacity: Number,
  members: Number,
  days: Number,
  numBags: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("car-bookings", bookingSchema);
