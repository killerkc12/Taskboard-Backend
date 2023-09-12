const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const taskListSchema = new mongoose.Schema({
  taskListName: {
    type: String,
    required: true,
  },
  board: {
    type: ObjectId,
    ref: "Board",
    required: true,
  },
});

mongoose.model("TaskList", taskListSchema);
