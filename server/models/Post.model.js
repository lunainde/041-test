//server/models/Post.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    imgUrl: String,
    title: {
      type: String,
      required: [true, "Title is required."],
      maxlength: [150, "Title cannot exceed 150 characters."],
    },
    postTag: {
      type: String,
      required: [true, "Tag is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      maxlength: [3000, "Content cannot exceed 3000 characters."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
