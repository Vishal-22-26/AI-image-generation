// User model (models/User.js)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);

// Credit model (models/Credit.js)
const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  credits: { type: Number, default: 0 },
});

module.exports = mongoose.model("Credit", CreditSchema);