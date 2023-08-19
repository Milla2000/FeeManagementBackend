CREATE OR ALTER PROCEDURE updateStudentFeeBalanceProc
    @id VARCHAR(200),
    @feebalance DECIMAL(18, 2)
AS
BEGIN
    UPDATE studentsTable
    SET feebalance = @feebalance
    WHERE id = @id;
END
