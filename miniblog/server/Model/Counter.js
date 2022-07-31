const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
  },
  { collection: "counters" }
);

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = { Counter };
