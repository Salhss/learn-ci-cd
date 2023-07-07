const { model, Schema } = require("mongoose");

const todoSchema = new Schema(
  {
    activity: String,
    status: String,
    date: String,
    description: String,
  },
  { collection: "TodoDb" }
);

module.exports = model("Todo", todoSchema);
