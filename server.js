const express = require("express");
const app = express();
const api = require("./api/index");
const mongooseConnection = require("./config/db.config");
app.use("/api",api);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
