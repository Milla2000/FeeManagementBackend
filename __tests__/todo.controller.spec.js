const request = require("supertest");
const { app } = require("../server"); // Adjust the path

describe("Student Controllers", () => {
  it("should add a new student", async () => {
    const studentData = {
      studentname: "John Doe",
      classroom: "Math",
      feebalance: 100,
    };

    const response = await request(app).post("/students").send(studentData);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Student created successfully");
  });

  it("should fetch student details by ID", async () => {
    // Assuming you have a valid student ID
    const studentId = "valid-student-id";

    const response = await request(app).get(`/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.student).toBeDefined();
  });

  it("should fetch all students", async () => {
    const response = await request(app).get("/students");
    expect(response.status).toBe(200);
    expect(response.body.students).toBeDefined();
  });

  it("should update fee balance for a student", async () => {
    // Assuming you have a valid student ID
    const studentId = "valid-student-id";
    const newFeeBalance = 150;

    const response = await request(app)
      .put(`/students/${studentId}`)
      .send({ feebalance: newFeeBalance });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Student fee balance updated successfully"
    );
  });

  it("should perform a soft delete for a student", async () => {
    // Assuming you have a valid student ID
    const studentId = "valid-student-id";

    const response = await request(app).delete(`/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Student deleted");
  });
});
