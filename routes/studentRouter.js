const { Router } = require("express");
const {
  createNewStudent,
  viewAllStudents,
  viewOneStudent,
  updateStudentFeeBalance,
  softDeleteStudent,
} = require("../controllers/studentController");

const studentRouter = Router();

studentRouter.post("/", createNewStudent);
studentRouter.get("/", viewAllStudents);
studentRouter.get("/:id", viewOneStudent);
studentRouter.put("/:id", updateStudentFeeBalance);
studentRouter.delete("/:id", softDeleteStudent);

module.exports = studentRouter; // Export the router directly
