//server/models/User.model.js
const { Schema, model } = require("mongoose");

// TODO:
const userSchema = new Schema(
  {
    imgUrl: String,
    siteUrl: String,
    headline: String,
    country: String,
    about: {
      type: String,
      maxlength: [140, "About cannot exceed 140 characters."],
    },
    country: String,
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["investor", "startup", "expert", "organization", "journalist"],
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
        "nature-based",
        "refi",
        "transport",
      ],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
