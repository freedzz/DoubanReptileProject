/* 设计数据库类型 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  MovieName:{
    type:String,
    required:true
  },
  MovieScore:{
    type:Number,
    required:false
  },
  MovieYear:{
    type: String,
    required:false
  },
  MovieReleaseDate:{
    type:String,
  },
  MovieProductionCountry:{
	 type:String,
	 required:false
  },
  MovieCommentNumber:{
    type:Number,
  }
})

mongoose.model('2013Movies',IdeaSchema);