CREATE OR ALTER PROCEDURE createStudentProc
    @id VARCHAR(200),
    @studentname VARCHAR(500),
    @class VARCHAR(1000),
    @feebalance DECIMAL(18, 2),
    @createdAt DATETIME,
    @is_deleted BIT = 0 -- Default value set to false
AS
BEGIN
    INSERT INTO studentsTable (id, studentname, class, feebalance, createdAt, is_deleted)
    VALUES (@id, @studentname, @class, @feebalance, @createdAt, @is_deleted);
END
