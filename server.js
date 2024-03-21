const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {DB_URL} = require("./configs/db.configs")
const mongoose = require("mongoose");
const {PORT} = require("./configs/server.configs")
const app = express();
const cors = require("cors");

app.use(cors())

mongoose.connect(DB_URL).then(()=>{
    console.log("Connected to DataBase");
}).catch((err)=>{
    console.log({message : err});
});

app.use(bodyParser.json());
require("./src/Routes/auth.routes")(app);

app.listen(PORT,()=>{
    console.log("Server Online");
});