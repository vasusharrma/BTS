import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import z from 'zod';

const app = express();
const PORT = 8000;
const dbURL = "mongodb+srv://Ram:7spze2dy9n@vasusharrmaa.4itmd.mongodb.net/userdbapp";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const Users = mongoose.model("Users", userSchema);

app.use(express.json());

mongoose.connect(dbURL)
  .then(() => console.log("db connected succesfully"))
  .catch((err) => console.error("error: ", err));


app.post("/signup", async (req: Request, res: Response): Promise<void> => {

  const username = req.headers.username as string;
  const password = req.headers.password as string;
  const email = req.headers.email as string;

  const userExist = await Users.findOne({ username });

  if (userExist) {
    res.status(411).json({ msg: "Usre already exits" });
    return;
  }

  const newUser = new Users({ username, password, email });
  newUser.save()
    .then(() => {
      console.log(`The user with username ${username} succesfully added to the db`)
      res.status(201).json({ msg: "user created succesfully" })
    })
    .catch((err) => console.error("err : ", err));

})





app.use((err: unknown, req: Request, res: Response): void => {
  console.error("error: ", err);
  if (err instanceof Error) {
    res.status(401).json({ error: err });
  }
  else {
    res.status(403).json({ msg: "something up with our server" });
  }
})

app.listen(PORT, function() {
  console.log(`server is running on port ${PORT}`);
})
