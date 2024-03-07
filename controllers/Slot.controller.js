const Parking = require("../models/Parking.model");
const acceptedColors = [
  "RED",
  "GREEN",
  "BLUE",
  "BLACK",
  "WHITE",
  "YELLOW",
  "ORANGE",
];
const getSlots = async (req, res) => {
  console.log("Slot GET : ", req.query);
  try {
    if (!acceptedColors.includes(req.query.color)) {
      res.status(400).json({
        isSuccess: false,
        error: {
          reason: `Invalid color`,
        },
      });
      return;
    }
    const parking = await Parking.find(req.query);
    // console.log(parking);
    res.status(200).json({
      isSuccess: true,
      response: {
        slots: parking
          .map((park) => {
            return {
              color: park.color,
              slotNumber: park.slotNumber,
            };
          })
          .sort((a, b) => a.slotNumber - b.slotNumber),
      },
    });
  } catch (err) {
    res.status(200).json({ isSuccess: false, error: { reason: err.message } });
  }
};
module.exports = {
  getSlots,
};
