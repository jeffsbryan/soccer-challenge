const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateOfWorkout: { type: Date, required: true },
  videoUrl: { type: String },
});

module.exports = mongoose.model("Workout", workoutSchema);
