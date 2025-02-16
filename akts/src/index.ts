import express, { Request, Response } from "express";
import dotenv from "dotenv"

dotenv.config();

const app = express();


app.get('/', (req: Request, res: Response): void => {
  res.send("Hello TS");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
  console.log(`server is listening on port ${PORT}`)
})











