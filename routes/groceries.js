const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();

//get groceries
router.get("/", async (req,res) => {
    const db = req.app.locals.db;
    try {
        const groceriesCollection = await  db.collection('groceries');
        const groceries = await groceriesCollection.find({}).toArray();
        res.status(200).json({
            status:'ok',
            data:{
                groceries: groceries,
            }
        });
    } catch(e) {
        console.log('Error:',e.message);
        res.status(500).json({
            status:'error',
            data:{
                message: e.message,
            }
        });
    }
});


//update grocery
router.put("/:category/:id", async (req,res) => {
    const db = req.app.locals.db;
    const groceryId = req.params.id;
    const category = req.params.category;
    try{
        const groceriesCollection = await  db.collection('groceries');
        const returnDoc = await groceriesCollection.updateOne({
            _id: new ObjectID(groceryId),
            category: category
        },{
            $inc:{
                remainingStock: -1,
            }
        });

        res.status(200).json({
            status:'ok',
            data:{
                result:returnDoc,
                message: 'Updated Successfully'
            }
        });

    } catch(e){
        console.log("Error:", e.message);
        res.status(500).statusMessage({
            status:'error',
            message:e.message,
        });
    }
});

module.exports = router