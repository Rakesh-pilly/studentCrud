const express = require('express');
const connect = require('./configs/db');
const studentController = require('./controller/student.controller.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())
app.use("/students",studentController )



app.listen(2345, async function(){
    await connect()
    console.log("listing on port 2345")
})