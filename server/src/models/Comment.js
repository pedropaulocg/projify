import mongoose from "mongoose";

const Schema = mongoose.Schema

const Comment = new Schema({
  body: {
    type: String, require: true
  },
  task: {
    type: Schema.Types.ObjectId, ref: 'tasks', required: true
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'users', required: true
  },
},
{
  timestamps: true
})

export default mongoose.model('comments', Comment)