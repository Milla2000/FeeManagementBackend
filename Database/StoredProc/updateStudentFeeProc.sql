CREATE OR ALTER PROCEDURE updateStudentFeeBalanceProc
    @id VARCHAR(200),
    @fee_balance DECIMAL(18, 2)
AS
BEGIN
    UPDATE studentsTable
    SET feebalance = @fee_balance
    WHERE id = @id;
END
