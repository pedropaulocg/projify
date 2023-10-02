import mongoose from "mongoose";

const Schema = mongoose.Schema

const Board = new Schema({
  name: {
    type: String, require: true
  },
  color: {
    type: String, require: true
  },
  position: {
    type: String, require: true
  },
  project: {
    type: Schema.Types.ObjectId, ref: 'projects', required: true
  },
})

export default mongoose.model('boards', Board)