const app = require("express")();
const slot = require("../controllers/Slot.controller");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", slot.getSlots);
module.exports = app;
