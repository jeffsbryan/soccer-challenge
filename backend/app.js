const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const Workout = require("./models/workout");
const Wod = require("./models/wod");
const multerS3 = require("multer-s3");
require("dotenv").config();

// Configure aws s3 SDK (update authentication)
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.s3AccessKeyId,
  secretAccessKey: process.env.s3SecretAccessKey,
});
const s3 = new AWS.S3();

// Unique name of aws s3 bucket created
const myBucket = process.env.s3Bucket;

// Multer upload (Use multer-s3 to save directly to AWS instead of locally)
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    // Set public read permissions
    acl: "public-read",
    // Auto detect contet type
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // Set key/ filename as original uploaded name
    key: function (req, file, cb) {
      var newFileName =
        Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      var fullPath = "vod/" + newFileName + "." + ext;
      cb(null, fullPath);
    },
  }),
});

const MIME_TYPE_MAP = {
  "video/x-ms-wmv": "wmv",
  "video/x-msvideo": "avi",
  "video/mp4": "mp4",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIME type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/videos");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

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
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/workouts", upload.single("workoutVideo"), (req, res, next) => {
  const workout = new Workout({
    title: req.body.title,
    description: req.body.description,
    dateOfWorkout: req.body.dateOfWorkout,
    videoUrl: req.file.location,
  });
  workout.save();

  res.status(201).json({
    message: "Workout added successfully",
  });
});

app.put("/api/workouts/:id", (req, res, next) => {
  const workout = new Workout({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    dateOfWorkout: req.body.dateOfWorkout,
  });
  console.log(workout);
  Workout.updateOne({ _id: req.params.id }, workout).then((result) => {
    res.status(200).json({ message: "Update successful!" });
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

app.get("/api/workouts/wod", (req, res, next) => {
  //console.log("Getting workout " + req.query.workoutDate);

  let startOfDay = new Date(req.query.workoutDate);
  startOfDay.setHours(0, 0, 0);
  let endDate = new Date();
  endDate.setDate(startOfDay.getDate() + 1);
  //new Date("2020-04-16")
  Workout.find({
    dateOfWorkout: { $gte: startOfDay, $lt: endDate },
  })
    .limit(1)
    .then((document) => {
      if (!document.length) {
        res.status(404).json({ message: "Workout not found!" });
      } else {
        res.status(200).json(document);
      }
    });
});

app.post("/api/wod", (req, res, next) => {
  console.log("Logging WOD Result");

  const wod = new Wod({
    result: req.body.result,
    comment: req.body.comment,
    userName: req.body.userName,
    workoutId: req.body.workoutId,
  });
  console.log(wod);

  wod.save();

  res.status(201).json({
    message: "Wod result saved successfully",
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
