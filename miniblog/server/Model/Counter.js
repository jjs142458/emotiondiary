const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
  },
  { collection: "ssscounters" }
);

const Counter = mongoose.model("counter", CounterSchema);

module.exports = { Counter };
