const express = require('express');
const {MongoClient} = require('mongodb');

const app = express();

app.listen(3000,() => {
    console.log('listening on port 3000');
})



