import mongoose from 'mongoose'

const DATABASE_URI = "mongodb+srv://Ram:7spze2dy9n@vasusharrmaa.4itmd.mongodb.net/todoData"

const connectDb = async (): Promise<void> => {

  try {

    await mongoose.connect(DATABASE_URI);
    console.log("db connected succesfully");
  }
  catch (err) {
    console.error("error : ", err);
    process.exit(1);
  }

}

export { connectDb }

