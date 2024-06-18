import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "A username is required!"],
    minLength: [3, "Username must be 3 or more characters!"],
    maxLength: [255, "Username must not exceed 255 characters!"],
  },
  fName: {
    type: String,
    required: [true, "A first name is required!"],
    minLength: [2, "First name must be 2 or more characters!"],
    maxLength: [255, "First name must not exceed 255 characters!"],
  },
  lName: {
    type: String,
    required: [true, "A last name is required!"],
    minLength: [2, "Last name must be 2 or more characters!"],
    maxLength: [255, "Last name must not exceed 255 characters!"],
  },
  email: {
    type: String,
    required: [true, "An email is required!"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "A password is required!"],
    minLength: [8, "Password must be 8 or more characters!"]
  }
}, {timestamps: true});

const User = model('User', UserSchema);
export default User;