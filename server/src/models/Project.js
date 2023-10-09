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
    type: String, required: false
  },
  picture: {
    type: String
  },
  isActive: {
    type: Boolean, default: true
  }
},
{
  timestamps: true
}
)

export default mongoose.model('projects', Project)