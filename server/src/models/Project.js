import mongoose from "mongoose";

const Schema = mongoose.Schema

const Project = new Schema({
  name: {
    type: String, required: true
  },
  participants: {
    type: [
      {type: Schema.Types.ObjectId, ref: 'users', required: true}
    ],
  },
  leader: {
    type: Schema.Types.ObjectId, ref: 'users', required: true
  },
  description: {
    type: String, required: true
  },
  picture: {
    type: String
  }
},
{
  timestamps: true
}
)

export default mongoose.model('projects', Project)