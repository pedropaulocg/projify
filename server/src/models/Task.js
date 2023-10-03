import mongoose from "mongoose";

const Schema = mongoose.Schema

const Task = new Schema({
  name: {
    type: String, required: true
  },
  description: {
    type: String, required: false
  },
  board: {
    type: Schema.Types.ObjectId, ref: 'boards', required: true
  },
  project: {
    type: Schema.Types.ObjectId, ref: 'projects', required: true
  },
  reporter: {
    type: Schema.Types.ObjectId, ref: 'users', required: true
  },
  assigned: {
    type: Schema.Types.ObjectId, ref: 'users', required: false
  },
  deadline: {
    type: Date, required: false
  },
  timer: {
    type: Number, required: false
  },
  priority: {
    type: Number, required: false
  }
},
{
  timestamps: true
}
)

export default mongoose.model('tasks', Task)