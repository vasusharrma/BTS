import mongoose from 'mongoose'

const DATABASE_URI = process.env.DATABASE_URI as string;

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

