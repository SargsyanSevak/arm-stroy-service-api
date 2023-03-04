const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

module.exports = router;
