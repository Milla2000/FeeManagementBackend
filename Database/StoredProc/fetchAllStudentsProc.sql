CREATE OR ALTER PROCEDURE fetchAllStudentsProc  
AS
BEGIN
    SELECT *
    FROM studentsTable;
END