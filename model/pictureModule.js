//picture modal
const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema(
  {
    quote: { type: String, required: true },
    photo: { type: String, required: true },
    device: {
      type: String,
      enum: ["mobile", "laptop", "tablet"],
      required: true,
    },
    commentsCount: { type: String, default: 0 },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const PictureModule = mongoose.model("notes", pictureSchema);

module.exports = { PictureModule };
