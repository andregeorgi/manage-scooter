const mongoose = require("mongoose");

const ScooterSchema = new mongoose.Schema({
  name: String,
  batteryLevel: Number,
  status: String,
  location: Object,
});

module.exports = mongoose.model("Scooters", ScooterSchema);
