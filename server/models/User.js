import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requiered: true,
    trim: true
  },
  name: {
    type: String,
    requiered: true,
    trim: true
  },
  lastname: {
    type: String,
    requiered: true,
    trim: true
  },
  email: {
    type: String,
    requiered: true,
    trim: true
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

export default mongoose.model('User', userSchema)