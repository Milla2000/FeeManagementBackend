CREATE OR ALTER PROCEDURE softDeleteStudentProc
    @id VARCHAR(200)
AS
BEGIN
    UPDATE studentsTable
    SET is_deleted = 1
    WHERE id = @id;
END
