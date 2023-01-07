const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nikName is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  token: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: new Date(),
  },
  avatarURL: {
    type: String,
    default: "",
  },
  rate: {
    type: String,
    default: "0",
  },
  peso: {
    type: Number,
    default: 0,
  },
  ships: {
    type: Array,
    default: [],
  },
});

const Users = mongoose.model("users", usersSchema);

module.exports = {
  Users,
};
