const mssql = require("mssql");
const { sqlConfig } = require("../../config/config");

const createStudentsTable = async (req, res) => {
  try {
    const table = `
      BEGIN 
      TRY
          CREATE TABLE studentsTable (
              id VARCHAR(200) PRIMARY KEY,
              studentname VARCHAR(500) NOT NULL,
              class VARCHAR(1000) NOT NULL,
              feebalance DECIMAL(18, 2) NOT NULL,
              createdAt DATETIME NOT NULL,
              is_deleted BIT DEFAULT 0
          )
      END TRY
  BEGIN   
      CATCH
          THROW 50001, 'Table already exists!', 1;
      END CATCH`;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log({ Error: err.message });
      } else {
        console.log("Table created successfully");
      }
    });
  } catch (error) {
    console.log({ Error: error });
  }
};

module.exports = { createStudentsTable };
