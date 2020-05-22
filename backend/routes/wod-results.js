const express = require("express");
const Wod = require("../models/wod");
const router = express.Router();

router.post("", (req, res, next) => {
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

module.exports = router;
