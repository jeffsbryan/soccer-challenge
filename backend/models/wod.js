const mongoose = require("mongoose");

const wodSchema = mongoose.Schema({
  workoutId: { type: String, required: true },
  userName: { type: String required:true},
  result: { type: String required:true},
  comment: { type: String },
});

module.exports = mongoose.model("Wod", workoutSchema);
