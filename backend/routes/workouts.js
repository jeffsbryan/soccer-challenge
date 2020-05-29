const express = require("express");
const multer = require("multer");
const Workout = require("../models/workout");
const multerS3 = require("multer-s3");
require("dotenv").config();

const router = express.Router();

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

router.post("", upload.single("workoutVideo"), (req, res, next) => {
  let videoUrl = req.body.videoUrl;
  if (req.file) {
    videoUrl = req.file.location;
  }

  const workout = new Workout({
    title: req.body.title,
    description: req.body.description,
    dateOfWorkout: req.body.dateOfWorkout,
    videoUrl: videoUrl,
  });

  workout.save();

  res.status(201).json({
    message: "Workout added successfully",
  });
});

router.put("/:id", upload.single("workoutVideo"), (req, res, next) => {
  let videoUrl = req.body.videoUrl;
  if (req.file) {
    videoUrl = req.file.location;
  }

  const workout = new Workout({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    dateOfWorkout: req.body.dateOfWorkout,
    videoUrl: videoUrl,
  });

  //console.log(workout);
  Workout.updateOne({ _id: req.params.id }, workout).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Workout.aggregate([
    {
      $lookup: {
        from: "wods",
        localField: "_id",
        foreignField: "workoutId",
        as: "results",
      },
    },
  ]).then((documents) => {
    res.status(200).json({
      message: "Results fetched successfully.",
      workouts: documents,
    });
  });
});

router.get("/wod", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
  Workout.findById(req.params.id).then((document) => {
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Workout not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Workout.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Workout deleted!" });
  });
});

module.exports = router;
