import mongoose, { Document, Schema } from 'mongoose'
import { TDSchema } from '../types'



const TDUser = new Schema<TDSchema>({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },

  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

export default mongoose.model<TDSchema>("User", TDUser);
