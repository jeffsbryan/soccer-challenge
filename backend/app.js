const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Workout = require("./models/workout");

mongoose
  .connect(
    "mongodb+srv://rebelsadmin:funvegan2020@cluster0-ufmw4.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/workouts", (req, res, next) => {
  const workout = new Workout({
    title: req.body.title,
    description: req.body.description,
    dateOfWorkout: req.body.dateOfWorkout,
  });

  workout.save();

  res.status(201).json({
    message: "Workout added successfully",
  });
});

app.get("/api/workouts", (req, res, next) => {
  Workout.find().then((documents) => {
    res.status(200).json({
      message: "Workouts fetched successfully!",
      workouts: documents,
    });
  });
});

app.get("/api/workouts/:id", (req, res, next) => {
  Workout.findById(req.params.id).then((document) => {
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Workout not found!" });
    }
  });
});

app.delete("/api/workouts/:id", (req, res, next) => {
  Workout.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Workout deleted!" });
  });
});

module.exports = app;
