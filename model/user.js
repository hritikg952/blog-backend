const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    // post: {
    //   type: ObjectId,
    //   ref: "Post"
    // },
    posts:{
      type: Array,
      default: []
    },
    postnumber:{
      type: Number,
      default: 0
    },
    salt: String,
    encry_password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
