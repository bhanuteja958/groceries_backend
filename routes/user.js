const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkIfUserExists } = require('../utility/helper');


router.post("/login", async (req,res) => {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');
    const { username, password } = req.body;

    try{
        const user = await usersCollection.findOne({
            username: username
        });

        if(!user){
            res.status(200).json({
                status:'error',
                data:{
                    message: 'User doesnot exist'
                },
                
            });
            return; 
        }

        console.log(password , user.password);

        if(await bcrypt.compare(password,user.password)) {
            const token = jwt.sign({
                id : user._id,
                username: user.username
            }, process.env.JWT_SECRET);
            res.status(200).json({
                status:'ok',
                data:{
                    token: token,
                    message:'Loggedin Successfully'
                },
                
            });
        } else{
            res.status(200).json({
                status:'error',
                data:{
                    message:'Please enter correct password'
                }
            });
        }
    } catch(e) {
        console.log("Error:",e.message);
    }
});

router.post("/signup", async (req,res) => {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');
    const { username, password } = req.body;

    try {
        const userExists = await checkIfUserExists(username,usersCollection);

        if(userExists) {
            res.json({status:'error', data:[], message:"Username already exists. Please try other username"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await usersCollection.insertOne({
            username: username,
            password: hashedPassword,
            fullName: '',
            addresses:[],
            cart:[],
            userImage:'',
            phoneNo: '',
            email:'',
        });

        res.status(200).json({
            status:'ok',
            data:{
                result:result,
                message:'Succesfully created your account'
            },
        });

    } catch(e) {
        console.log("Error:",e.message);
        res.status(200).json({
            status:'error',
            data:{
                message:e.message
            },
        });
    }
    
});

module.exports = router;