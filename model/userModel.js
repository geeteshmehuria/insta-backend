// userModel
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const UserModule = mongoose.model("user", userSchema);

module.exports = { UserModule };
