import { allUsers } from './types/types'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import z from 'zod';
const jwtPassword = 'asdfg'

const ALL_USERS: allUsers[] = [
  {
    username: "vasusharrmaa",
    password: "123abc",
    name: "Vasu Sharma"
  }, {
    username: "shivangi",
    password: "abc123",
    name: "Shivang Sharma"
  }, {
    username: "nikhil@nr",
    password: "nik123",
    name: "Nikhil Rana"
  }
]

const app = express();
app.use(express.json());
const signinSchema = z.object({
  username: z.string(),
  password: z.string()
})

function userExists(username: string, password: string): boolean {
  return ALL_USERS.some(e => e.username === username && e.password === password);
}


app.post('/signin', (req: Request, res: Response): void => {

  const resposne = signinSchema.safeParse(req.body);
  if (!resposne.success) {
    console.log("Hello")
    res.status(400).json({ msg: resposne.error });
    return;
  }

  const username = resposne.data.username;
  const password = resposne.data.password;

  if (!userExists(username, password)) {
    res.status(403).json({ error: "User doen't exits" });
    return;
  }

  var token = jwt.sign({ username: username }, "sitaramam");
  res.json({ token });
})

app.listen(5000, () => {
  console.log("server is live on port 5000")
});
