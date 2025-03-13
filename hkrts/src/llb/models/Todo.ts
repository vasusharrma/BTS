
import mongoose, { Schema, Document } from 'mongoose'


interface TDSchema extends Document {
  name: string,
  email: string,
  age: number,
  createdAt: Date,
  updatedAt: Date
}


const TDUser = new Schema<TDSchema>({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
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
