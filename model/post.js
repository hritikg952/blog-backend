const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    content: {
      type: String,
      required: true,
    },

    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Post", postSchema);
