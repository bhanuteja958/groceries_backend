const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get("/:userId", async(req,res) => {
    const db = req.app.locals.db;
    const userId = req.params.userId;
    try{
        const ordersCollection = await db.collection("orders");
        const orders = await ordersCollection.find({
            userId: userId
        }).toArray();

        res.status(200).json({
            status:'ok',
            data:{
                message: 'Orders Sent',
                orders: orders
            }
        })
    } catch(e) {
        console.log('Error:',e.message);
        res.status(500).json({
            status:'error',
            data:{
                message:'Internal Error',
            }
        })
    }
});

router.post("/",async(req,res) => {
    const db = req.app.locals.db;
    const { 
        userId, orderedItems, totalAmount,tax,gst 
    } = req.body;
 
    try{
        const ordersCollection = await db.collection("orders");
        const returnDoc = await ordersCollection.insertOne({
            userId : userId,
            orderdItems: orderedItems,
            totalAmount: totalAmount,
            tax: tax,
            gst: gst,
            orderStatus: 'Received',
            paymentMethod: 'COD',
            paymentStatus: 'Not Paid',
        });

        res.status(200).json({
            status:'ok',
            data:{
                message: 'Order Received',
                result:returnDoc
            }
        })
    } catch(e) {
        console.log('Error:',e.message);
        res.status(500).json({
            status:'error',
            data:{
                message:'Internal Error',
            }
        })
    }
});

module.exports = router;