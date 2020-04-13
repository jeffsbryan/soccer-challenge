const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Workout added successfully",
  });
});

app.get("/api/workouts", (req, res, next) => {
  const workouts = [
    {
      title: "First Workout",
      description: "This is coming from the server",
    },
    {
      title: "Second Workout",
      description: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Workouts fetched successfully!",
    workouts: workouts,
  });
});

module.exports = app;
