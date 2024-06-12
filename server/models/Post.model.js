//server/models/Post.model.js
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    imgUrl: String,
    title: {
      type: String,
      required: [true, "Title is required."],
      maxlength: [140, "Title cannot exceed 150 characters."],
    },
    tags: {
      type: [String],
      required: [true, "Tag is required."],
      enum: [
        "building",
        "carbon",
        "energy",
        "food",
        "greentech",
        "investment",
        "refi",
        "transport",
      ],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      maxlength: [3000, "Content cannot exceed 3000 characters."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
