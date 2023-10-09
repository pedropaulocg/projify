import mongoose from "mongoose";

const Schema = mongoose.Schema

const Message = new Schema({
  body: {
    type: String, require: true
  },
  replyMsg: {
    type: Schema.Types.ObjectId, ref: 'messages', required: false, default: undefined
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'users', required: true
  },
  project: {
    type: Schema.Types.ObjectId, ref: 'projects', required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('messages', Message)