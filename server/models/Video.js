const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const videoSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
      type: String,
      required: true,
  }
  ,
  description: {
    type: String,
    required: true,
  },
  secret: {
      type: String,
      required: true,
  },
  category: {
      type: String,
      required: true,
  },
  filePath: {
      type: String,
      required: true,
  },
  view: {
      type: Number,
      default:0
  }
  
}, { timestamps: true });


const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
