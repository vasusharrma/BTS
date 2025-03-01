import mongoose from "mongoose";
import express, { Request, Response } from 'express'

const app = express();
const mongoURL = "mongodb+srv://Ram:7spze2dy9n@vasusharrmaa.4itmd.mongodb.net/"
const PORT = 3900;
app.use(express.json());


mongoose.connect(mongoURL)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.error("error: ", err));

app.get('/', function (req: Request, res: Response): void {
  res.send("Homepage");
})


app.use((err: unknown, req: Request, res: Response): void => {
  console.error("err: ", err);
  if (err instanceof Error) {
    res.status(500).json({ error: err });
    return;
  }
  else {
    res.status(411).json({ msg: "something up with our server" });
  }
})


app.listen(PORT, () => {
  console.log(`server is live on PORT ${PORT}`);
})
