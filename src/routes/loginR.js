const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
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
        try {
            //midlewire
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() })
            }
            //************** */
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            //IF USER IS NOT PRESENT 
            if (!user) {
                // console.log(user)
                return res.status(409).json({
                    status: "Failed",
                    message: "Redirect to the register page / not a registerd user"
                })
            }
            //IF USER PRESENT 
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(409).json({
                        status: "falied",
                        error: err.message
                    })
                }

                if (result === true) {
                    //result == true and login in sucessfully 
                    //Jsw web TOKEN 
                    var token = jwt.sign({ data: user._id }, 'shhhhh');
                    return res.json({
                        status:"Success",
                        token: token
                    })

                } else {
                    return res.status(409).json({
                        status: "falied",
                        errorMessege: 'password incorrect'
                    })
                }
            });

        } catch (error) {
            res.json({
                status: "failed",
                messege: error.message
            })

        }
    },
);
module.exports = router;