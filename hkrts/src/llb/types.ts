
export interface TDSchema extends Document {
  name: string,
  email: string,
  password: string,
  age: number,
  createdAt: Date,
  updatedAt: Date
}
