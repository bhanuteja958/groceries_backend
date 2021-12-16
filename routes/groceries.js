const express = require('express');
const router = express.Router();


//get fruits
router.get("/fruits", (req,res) => {
    res.send('Fruits Sent');
});

//get vegetables
router.get("/vegetables", (req,res) => {
    res.send('Vegetables Sent');
});

//update fruit
router.put("/fruits/:id",(req,res) => {
    res.send('fruit updated');
});


//update vegetable
router.put("/vegetables/:id",(req,res) => {
    res.send('vegetable updated');
});


module.exports = router