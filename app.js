const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

//Routes
const groceriesRouter = require('./routes/groceries');
const userRouter = require('./routes/user');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(bodyParser.json())

app.get("/",(req,res) => {
    res.send("homepage");
})

app.use("/api/groceries", groceriesRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", ordersRouter);


const client =new MongoClient(process.env.DB_URI);


async function connectDB() {
    try{
        await client.connect();
        const db = await client.db("groceries");
        app.locals.db = db;
        app.listen(3000,() => {
            console.log('listening on port 3000');
        })
    } catch(e){
        console.error('Error',e.message);
    }
}

connectDB().catch(e => {
    console.log(e.message);
});







