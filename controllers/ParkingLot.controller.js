const ParkingLot = require("../models/ParkingLot.model");
const getParkingLots = async (req, res) => {
  console.log("ParkingLot GET : ", req.body);
  try {
    const parkingLots = await ParkingLot.find({});
    res.status(200).json({
      isSuccess: true,
      response: parkingLots,
    });
  } catch (error) {
    res
      .status(200)
      .json({ isSuccess: false, error: { reason: error.message } });
  }
};
const addParkingLot = async (req, res) => {
  console.log("ParkingLot POST : ", req.body);
  try {
    if(!req.body.capacity) {
      res.status(200).json({
        isSuccess: false,
        error: {
          reason: `Invalid Capacity`,
        },
      });
      return;
    }
    const parkingLot = new ParkingLot(req.body);
    await parkingLot.save();
    res.status(200).json({
      isSuccess: true,
      response: {
        id: parkingLot.id,
        capacity: parkingLot.capacity,
        isActive: parkingLot.isActive,
      },
    });
  } catch (error) {
    if(error.message.includes("id:"))
      error.message = "Invalid ID";
    else if(error.message.includes("capacity:"))
    error.message = "Invalid Capacity";
    res.status(200).json({
      isSuccess: false,
      error: {
        reason: error.message,
      },
    });
  }
};
module.exports = {
  getParkingLots,
  addParkingLot,
};
