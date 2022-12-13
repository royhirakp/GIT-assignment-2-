const express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

const router = express.Router();
const User = require('../models/userS')
const Post = require('../models/postS')
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

router.post("/", async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title, 
            body : req.body.body, 
            image: req.body.image,
            user : req.userAUT
        })
        res.json({
            status: "post created",
            data : post
        })
    } catch (error) {
        res.status(401).json({
            status: "error",
            errMessege : error.messege
        })
    }
})
//GET METHOD 
router.get("/:id", async (req,res)=>{
    const post = await Post.find({_id: req.params.id})
    console.log(post)
    res.json({
        p: post
    })
})
//PUT METHOD
router.put("/:postId", async (req, res) => {
    try {
       
        const post = await Post.updateOne({_id: req.params.postId},{
            title: req.body.title, 
            body : req.body.body, 
            image: req.body.image,
        })
        res.json({
            status: "updated",
            data : post
        })
    } catch (error) {
        res.status(401).json({
            status: "error",
            errMessege : error.messege
        })
    }
})
//delete 
router.delete("/:postId", async (req, res) => {
    try {
      
        const post = await Post.deleteOne({_id: req.params.postId})
        res.json({
            status: "Successfully deleted"
        })
    } catch (error) {
        res.status(401).json({
            status: "error",
            errMessege : error.messege
        })
    }
})
module.exports = router;