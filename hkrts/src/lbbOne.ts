import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
  console.log(`server is live on port ${PORT}`)
})

