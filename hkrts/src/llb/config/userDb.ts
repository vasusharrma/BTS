import mongoose from 'mongoose'

const DATABASE_URI = process.env.DATABASE_URI as string;


const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("db is connected : ")

  }
  catch (err) {
    console.error("Error : ", err);
    process.exit(1);
  }
}

export { dbConnect }
