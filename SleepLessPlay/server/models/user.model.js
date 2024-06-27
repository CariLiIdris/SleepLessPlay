import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "A username is required!"],
    minLength: [3, "Username must be 3 or more characters!"],
    maxLength: [255, "Username must not exceed 255 characters!"],
    unique: [true, 'That username is already taken']
  },
  fName: {
    type: String,
    required: [true, "A first name is required!"],
    minLength: [2, "First name must be 2 or more characters!"],
    maxLength: [255, "First name must not exceed 255 characters!"]
  },
  lName: {
    type: String,
    required: [true, "A last name is required!"],
    minLength: [2, "Last name must be 2 or more characters!"],
    maxLength: [255, "Last name must not exceed 255 characters!"]
  },
  email: {
    type: String,
    required: [true, "An email is required!"],
    unique: [true, 'That email already exists!'],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "A password is required!"],
    minLength: [8, "Password must be 8 or more characters!"]
  },
  bio: {
    type: String,
    minLength: [, "A bio must have at least 2 character"],
    maxLength: [255, "Last name must not exceed 255 characters!"]
  },
  userIcon: {
    type: String,
    required: false
  }
}, { timestamps: true });

// Compare & Confirm passwords
UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Hash PSWD before saving
UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.plugin(mongooseUniqueValidator);

const User = model('User', UserSchema);
export default User;