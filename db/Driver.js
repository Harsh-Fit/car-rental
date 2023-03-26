const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverImg: String,
  driverName: String,
  drivingExperiance: String,
  driverMobNo: Number,
  availability: String,
  food: String,
  smoke: String,
  drink: String,
  charges: Number,
});

module.exports = mongoose.model("driverlists", driverSchema);
