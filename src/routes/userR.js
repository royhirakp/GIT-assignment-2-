const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
// var jwt = require('jsonwebtoken');
const app = express()
const router = express.Router();
const User = require('../models/userS')
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

router.post('/',
    body('email').isEmail(), // millde wire
    async (req, res) => {
       const {name , email, password} = req.body;
        try {
            //midlewire
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() })
            }
            //************** */
            //FOR ADDED USER 
            const {name , email, password} = req.body;
            const user = await User.findOne({email});
            
            if(user){
                // console.log(user)
                return res.status(409).json({
                    status: "Failed",
                        message: "User already exists with the given email"
                    })                
            }
                //FOR NEW USER
                bcrypt.hash(password,10, async function (err, hash){
                    if(err){
                        return res.json(err)
                    }                 
                    const user = await User.create({
                        name: req.body.name,
                        email:req.body.email,
                        password:hash
                    })
                    res.json({
                        status:"susecss",
                        messege: "user created susessfully",
                        user
                    })
                })
        } catch (error) {
            res.json({
                status: "failed",
                messege: error.message
            })

        }
    },
);
module.exports = router;