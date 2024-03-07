const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ParkingLotSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-fA-F0-9]{24}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid id!`,
    },
  },
  capacity: {
    type: Number,
    required: [true, "Invalid Capacity"],
    min: [0, "Invalid Capacity"],
    max: [2000, "Capacity exceeds maximum limit"],
    validate: {
      validator: function (v) {
        console.log("v : ", v);
        return typeof v === "number";
      },
      message: (props) => `Invalid Capacity`,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("ParkingLot", ParkingLotSchema);
