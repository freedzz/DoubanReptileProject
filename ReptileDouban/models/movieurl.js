/* 设计数据库类型 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  url:{
    type:String,
    required:true
  }
})

mongoose.model('MovieUrl',IdeaSchema);