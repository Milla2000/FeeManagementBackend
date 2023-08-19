const { v4 } = require("uuid");
const mssql = require("mssql");
const { sqlConfig } = require("../config/config");
const { createStudentsTable } = require("../Database/Tables/createTables");

const createNewStudent = async (req, res) => {
  try {
    createStudentsTable(); // Call a function to ensure the table is created

    const id = v4();
    const currentTime = new Date();
    const { studentname, classroom, feebalance } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("studentname", mssql.VarChar, studentname)
        .input("class", mssql.VarChar, classroom)
        .input("feebalance", mssql.Decimal, feebalance)
        .input("createdAt", mssql.DateTime, currentTime)
        .input("is_deleted", mssql.Bit, 0)
        .execute("createStudentProc");

      if (result.rowsAffected[0] == 1) {
        return res.status(201).json({
          message: "Student created successfully",
        });
      } else {
        return res.status(500).json({ message: "Student creation failed" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const viewOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    const student = (
      await pool.request().input("id", id).execute("fetchOneStudentProc")
    ).recordset;

    // if (student.length === 0) {
    //   return res.status(404).json({ error: "Student not found" });
    // }
    return res.status(200).json({
      student: student
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the student" });
  }
};

const viewAllStudents = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const allStudents = (await pool.request().execute("fetchAllStudentsProc"))
      .recordset;

    res.status(200).json({ students: allStudents });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateStudentFeeBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { feebalance } = req.body;

    const pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("feebalance", mssql.Decimal, feebalance)
      .execute("updateStudentFeeBalanceProc");

    if (result.rowsAffected[0] == 1) {
      return res.status(200).json({
        message: "Student fee balance updated successfully",
      });
    } else {
      return res.status(500).json({
        message: "Student fee balance update failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the student",
    });
  }
};

const softDeleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", id)
      .execute("softDeleteStudentProc");

    if (result.rowsAffected[0] == 1) {
      res.status(200).json({
        message: "Student deleted",
      });
    } else {
      res.status(404).json({
        message: "Student not found",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the student" });
  }
};

module.exports = {
  createNewStudent,
  viewAllStudents,
  viewOneStudent,
  updateStudentFeeBalance,
  softDeleteStudent,
};
