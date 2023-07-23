const express = require("express");

const router = express.Router();

const {
  createStudent,
  getAllStudent,
  deleteStudent,
  increaseCount,
  decreaseCount,
} = require("../controllers/userController");

router.post("/add", createStudent);

router.get("/getall", getAllStudent);

router.delete("/remove-student/:id", deleteStudent);

router.post("/increase-count", increaseCount);

router.post("/decrease-count", decreaseCount);

module.exports = router;
