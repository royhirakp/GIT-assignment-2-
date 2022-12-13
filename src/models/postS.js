const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    title: String, 
    body: String, 
    image: String, 
    user:{type: ObjectId, ref: "User"}
  })
  const Post = mongoose.model('Post', PostSchema    );
module.exports = Post ;