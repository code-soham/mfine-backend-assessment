const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});
app.use("/ParkingLots", require("../routes/ParkingLot.route"));
app.use("/Parkings", require("../routes/Parking.route"));
app.use("/Slots", require("../routes/Slot.route"));
module.exports = app;
