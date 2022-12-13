const express = require('express')
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const app = express()
//Routs
const UserRoute = require('./src/routes/userR')
const PostsRoute = require('./src/routes/postR');
const LogInRoute = require('./src/routes/loginR')
//import models
const User = require('./src/models/userS');
const Post = require('./src/models/postS');
//connection to database 
mongoose.connect('mongodb://localhost/assignment')
    .then(() => console.log('database Connected!'));


// MIDLEWRE
app.use("/posts", async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            var decoded = await jwt.verify(req.headers.authorization, 'shhhhh'); // this is the object
            req.userAUT = decoded.data;
            console.log(req.userAUT);
            next();
        } catch (error) {
            return res.status(403).json({
                status: "error",
                messege: "the user is not valid/ not a valid token"
            })
        }
        
    } else {
        res.status(403).json({
            status: "error/ token not provided"
        })
    }
})

app.use('/register', UserRoute);
app.use('/login', LogInRoute);
app.use('/posts', PostsRoute);

//BAD REQUEST
app.use('*',(req, res)=>{
  res.status(404).json({
    status: '404! not found'
  })
})

app.listen(3000, () => console.log('server start at port 3000....'))
