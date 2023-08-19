const mssql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost", // or '127.0.0.1'
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

console.log(
  `${process.env.DB_USER}  ${process.env.DB_PWD}  ${process.env.DB_NAME}`
);

async function connectToDatabase() {
  try {
    await mssql.connect(sqlConfig);
    console.log("Connected to db successfully :)");
  } catch (err) {
    console.error("Error connecting to the database :(   :", err);
  }
}

connectToDatabase();

module.exports = {
  sqlConfig,
};
