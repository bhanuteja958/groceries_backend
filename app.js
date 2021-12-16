const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

//Routes
const groceriesRouter = require('./routes/groceries');

const app = express();

app.get("/",(req,res) => {
    res.send("homepage");
})

app.use("/groceries", groceriesRouter);

app.listen(3000,() => {
    console.log('listening on port 3000');
})



