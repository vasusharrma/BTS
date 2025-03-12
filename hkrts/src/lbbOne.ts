import express, { Request, Response } from 'express';
import dotenv from 'dotenv'



const app = express();
dotenv.config();
const PORT = process.env.PORT
app.use(express.json());


app.listen(PORT, (): void => {
  console.log(`server is live on port ${PORT}`)
})
