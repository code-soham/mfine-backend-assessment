const mongoose = require("mongoose");
const ParkingLot = require("./ParkingLot.model");
const Schema = mongoose.Schema;
const ParkingSchema = new Schema({
  parkingLotId: {
    type: String,
    required: true,
    minLength: 24,
    maxLength: 24,
  },
  registrationNumber: {
    type: String,
    required: true,
    length: 9,
    validate: {
      validator: function (v) {
        return /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/.test(v);
      },
      message: (props) => `Invalid Registration Number`,
    },
    unique: {
      message: "Registration number already exists!",
    },
  },
  color: {
    type: String,
    required: true,
    enum: ["RED", "BLUE", "GREEN", "YELLOW", "WHITE", "BLACK", "ORANGE"],
  },
  status: {
    type: String,
    required: false,
    default: "PARKED",
    enum: ["PARKED", "LEFT"],
  },
  slotNumber: {
    type: Number,
    required: false,
    unique: true,
  },
});
//assign unique slot number (integer) before saving the parking
ParkingSchema.pre("save", async function (next) {
  const parking = this;
  if (parking.isNew) {
    console.log("pre slotnum", parking);
    // const slots = await this.find({ parkingLotId : parking.parkingLotId });
    const slots = await this.constructor.find({ parkingLotId: parking.parkingLotId });
    const slotNumbers = slots.map((slot) => slot.slotNumber);
    console.log("slotNumbers filled : ", slotNumbers);
    const slotNumber = Array.from({ length: 2000 }, (_, i) => i + 1).find(
      (slot) => !slotNumbers.includes(slot)
    );
    parking.slotNumber = slotNumber;
    console.log(parking);
  }
  next();
});
//check if parkingLot with id exists
ParkingSchema.pre("save", async function (next) {
  const parking = this;
  const ParkingLot = require("./ParkingLot.model");
  const { ObjectId } = require("mongoose").Types;
  const parkingLot = await ParkingLot.findOne({ id: parking.parkingLotId });
  // console.log("check lot ther ", parkingLot);
  if (!parkingLot) {
    throw new Error("ParkingLot not found!");
  }
  next();
});
module.exports = mongoose.model("Parking", ParkingSchema);
