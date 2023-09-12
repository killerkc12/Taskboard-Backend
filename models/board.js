const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Board", boardSchema);
