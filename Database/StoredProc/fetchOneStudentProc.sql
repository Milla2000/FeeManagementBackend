CREATE OR ALTER PROCEDURE fetchOneStudentProc
    @id VARCHAR(200)
AS
BEGIN
    SELECT *
    FROM studentsTable
    WHERE id = @id;
END