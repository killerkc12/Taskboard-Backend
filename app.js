require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = process.env;
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

require("./models/user");
require("./models/board");
require("./models/taskList");
require("./models/task");

app.use(express.json());

app.use("/", require("./router"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
