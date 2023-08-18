import request from "supertest";
import app from "../server"; // Replace with the correct path to your Express app

describe("Student Fees Management", () => {
  it("should add a new student", async () => {
    const studentData = {
      studentname: "John Doe",
      class: "10A",
      feebalance: 1000,
    };

    const res = await request(app).post("/students").send(studentData);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Student created successfully");
  });

  it("should update fee balance for a student", async () => {
    // Assuming you have a student with ID 1 in the database
    const updatedBalance = 1500;

    const res = await request(app)
      .put("/students/1")
      .send({ feebalance: updatedBalance });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Student fee balance updated successfully");
  });

  it("should perform a soft delete for a student", async () => {
    // Assuming you have a student with ID 2 in the database
    const res = await request(app).delete("/students/2");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Student soft deleted");
  });

  it("should fetch all students", async () => {
    const res = await request(app).get("/students");

    expect(res.status).toBe(200);
    expect(res.body.students).toBeInstanceOf(Array);
  });

  it("should fetch student details by ID", async () => {
    // Assuming you have a student with ID 3 in the database
    const res = await request(app).get("/students/3");

    expect(res.status).toBe(200);
    expect(res.body.student).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        studentname: expect.any(String),
        class: expect.any(String),
        feebalance: expect.any(Number),
        is_deleted: expect.any(Boolean),
      })
    );
  });

  it("should return 404 if student not found by ID", async () => {
    const res = await request(app).get("/students/9999");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });
});
