const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  quoteId: {
    type: String,
    required: true,
  },
  currentIns: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  employmentStatus: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  licensedDt: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  licenseNum: {
    type: String,
    required: true,
  },
});

module.exports = Driver = mongoose.model("drivers", DriverSchema);
