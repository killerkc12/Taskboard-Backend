const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskList: {
    type: ObjectId,
    ref: "TaskList",
  },
});

mongoose.model("Task", taskSchema);
