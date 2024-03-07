const Parking = require("../models/Parking.model");
const getParkings = async (req, res) => {
  console.log("Parking GET : ", req.query);
  try {
    const parking = await Parking.find(req.query);
    if (req.query.parkingLotId && parking.length === 0) {
      res.status(200).json({
        isSuccess: false,
        error: {
          reason: `No car found in parkingLotId ${req.query.parkingLotId}`,
        },
      });
      return;
    } else if (
      req.query.color &&
      !req.query.parkingLotId &&
      (parking === null || parking.length === 0)
    ) {
      res.status(200).json({
        isSuccess: false,
        error: { reason: `No car found with color ${req.query.color}` },
      });
      return;
    }
    res.status(200).json({
      isSuccess: true,
      response: {
        registrations: parking.map((park) => {
          return {
            color: park.color,
            registrationNumber: park.registrationNumber,
          };
        }),
      },
    });
  } catch (error) {
    res.status(200).json({
      isSuccess: false,
      error: {
        reason: error.message,
      },
    });
  }
};
const addParking = async (req, res) => {
  console.log("Parking POST : ", req.body);
  let ObjectId = require("mongoose").Types.ObjectId;
  try {
    const parking = new Parking(req.body);
    await parking.save();
    res.status(200).json({
      isSuccess: true,
      response: {
        slotNumber: parking.slotNumber,
        status: parking.status,
      },
    });
  } catch (error) {
    console.log(error);
    if(error.message.includes("registrationNumber:"))
    error.message = "Invalid Registration Number";
    else if(error.message.includes("color:"))
    error.message = "Invalid Color";
    res.status(200).json({
      isSuccess: false,
      error: {
        reason: error.message,
      },
    });
  }
};
const deleteParking = async (req, res) => {
  console.log("Parking DELETE : ", req.body);
  try {
    const parking = await Parking.findOneAndDelete({
      parkingLotId: req.body.parkingLotId,
      registrationNumber: req.body.registrationNumber,
    });
    if (parking === null) {
      res.status(200).json({
        isSuccess: false,
        error: {
          reason: `No car found with registrationNumber ${req.body.registrationNumber} in parkingLotId ${req.body.parkingLotId}`,
        },
      });
      return;
    }
    parking.status = "LEFT";
    res.status(200).json({
      isSuccess: true,
      response: {
        slotNumber: parking.slotNumber,
        registrationNumber: parking.registrationNumber,
        status: parking.status,
      },
    });
  } catch (error) {
    res.status(200).json({
      isSuccess: false,
      error: {
        reason: error.message,
      },
    });
  }
};
module.exports = {
  getParkings,
  addParking,
  deleteParking,
};
