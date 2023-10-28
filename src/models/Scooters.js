const mongoose = require("mongoose");

const ScooterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  batteryLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  location: Object,
});

module.exports = mongoose.model("Scooters", ScooterSchema);
