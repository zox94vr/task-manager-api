const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Cannot include password");
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive number");
        }
      }
    },
    avatar: {
      type: Buffer
    },
    verificationCode: {
      type: String
    },
    verifed: {
      type: Boolean
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});
userSchema.methods.generateAuthToken = async function() {
  //we are using function couse we need access to this(user)
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({
    token
  });
  await user.save();

  return token;
};
userSchema.methods.toJSON = function() {
  const user = this;
  const publicUser = user.toObject();
  delete publicUser.password;
  delete publicUser.tokens;
  delete publicUser.avatar;
  delete publicUser.verificationCode;
  return publicUser;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//hash the plain text password before saving
userSchema.pre("save", async function(next) {
  const user = this;
  console.log("Just before saving");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  //when you finish doing stuff before saving just call next()
  next();
});
userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({
    owner: user._id
  });
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
