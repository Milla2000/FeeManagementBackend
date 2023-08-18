const express = require('express');
const bodyParser = require('body-parser');



const cors = require('cors');
const { studentRouter } = require('./routes/studentRoutes');





const app = express();

app.use(bodyParser.urlencoded({extended: true }))
app.use(express.json())
app.use(cors());
app.use('/students', studentRouter) 


app.get((err,req,res,next)=>{
    res.json({Error: err})
})

