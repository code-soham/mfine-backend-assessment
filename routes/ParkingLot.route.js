const app = require("express")();
const parkingLot = require("../controllers/ParkingLot.controller");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", parkingLot.getParkingLots);
app.post("/", parkingLot.addParkingLot);
module.exports = app;
