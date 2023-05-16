const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  var hash = bcrypt.hashSync(this.password, 8);

  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



const User = mongoose.model("user", userSchema);

module.exports = User;
