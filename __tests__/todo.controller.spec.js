const request = require("supertest");
const { app } = require("../server"); 

describe("Student Controllers", () => {
  it("should add a new student", async () => {
    //note-  Assuming you have student data to send
    const studentData = {
      studentname: "John Doe",
      classroom: "Math",
      feebalance: 100,
    };

    const response = await request(app).post("/students").send(studentData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Student created successfully");
  });

   it("should return 400 if required input values are missing", async () => {
     // Missing studentname, classroom, and feebalance in req.body
     const response = await request(app).post("/students").send({});

     expect(response.status).toBe(400);
     expect(response.body.error).toBe("Missing required input values");
   });

   it("should return 400 if feebalance is negative", async () => {
     const response = await request(app).post("/students").send({
       studentname: "John Doe",
       classroom: "Class A",
       feebalance: -50,
    });



     expect(response.status).toBe(400);
     expect(response.body.error).toBe("Invalid fee balance value");
   });

    it("should return 400 if feebalance is not a number", async () => {
      const response = await request(app).post("/students").send({
        studentname: "John Doe",
        classroom: "Class A",
        feebalance: "fee",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid fee balance value");
    });

  it("should fetch student details by ID", async () => {
    // NOte: Assuming you have a valid student ID
    const studentId = "744e2284-82d4-4470-b542-e8d0b92e0bae";

    const response = await request(app).get(`/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.student).toBeDefined();
    // expect(response.body.student).toBe(student);
  });

  it("should fetch all students", async () => {
    const response = await request(app).get("/students");
    expect(response.status).toBe(200);
    expect(response.body.students).toBeDefined();
  });

  it("should update fee balance for a student", async () => {
    // Assuming you have a valid student ID 
    // i have used a valid student ID from my database
    const studentId = "744e2284-82d4-4470-b542-e8d0b92e0bae";
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
    // Assuming you have a valid student ID - 
    // note:  use a valid student ID 
    const studentId = "744e2284-82d4-4470-b542-e8d0b92e0bae";

    const response = await request(app).delete(`/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Student deleted");
  });
});
