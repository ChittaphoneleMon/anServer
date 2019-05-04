var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: "Full name can't be empty",
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: "Password can't be empty",
    minlength: [4, "Password must be atleast 4 character long"],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model("users", userSchema);
module.exports = User;