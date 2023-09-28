import mongoose from "mongoose";
import { string } from "yup";

const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String, require: true
  },
  email: {
    type: String, require: true
  },
  password: {
    type: String, require: true
  },
  profilePic: {
    type: String, require: false
  }
})

export default mongoose.model('users', User)