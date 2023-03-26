const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carCompany: String,
  carColor: String,
  carModel: String,
  carType: String,
  carImg: String,
  car360: String,
  carOwner: String,
  numPlate: String,
  regDate: String,
  insurance: String,
  insuranceValidity: String,
  passangerCapacity: Number,
  fuelType: String,
  feature: String,
  totalRunning: Number,
  charge: Number,
});

module.exports = mongoose.model("carlists", carSchema);
