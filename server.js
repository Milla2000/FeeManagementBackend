const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentRouter = require("./routes/studentRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/students", studentRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ Error: err.message });
});

app.listen(4500, () => {
  console.log("server running on port 4500");
});


module.exports = {
  app
}