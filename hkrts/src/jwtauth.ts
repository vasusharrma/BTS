import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { allUsers } from './types/types'
import z from 'zod'

const ALL_USER: allUsers[] = [
  {
    username: "vasusharrma",
    password: "vas123",
    name: "Vasu Sharma"
  },
  {
    username: "shivangii",
    password: "shiv12",
    name: "Shivang Sharma"
  },
  {
    username: "nikrana",
    password: "nik123",
    name: "Nikhil Rana"
  }
]

function isValidUser(username: string): boolean {
  return ALL_USER.some((e) => e.username === username);
}

const userSignupSchema = z.object({
  username: z.string(),
  password: z.string()
})


const app = express();
const jwtPass = 'lalkabutar'
app.use(express.json());

app.post('/signin', (req: Request, res: Response): void => {

  const zresponse = userSignupSchema.safeParse(req.body);

  if (!zresponse.success) {
    res.status(400).json({ err: zresponse.error.format() })
    return;
  }

  const { username, password } = zresponse.data;

  if (!isValidUser(username)) {
    res.status(500).json({ msg: `User with username ${username} is not in our database` })
    return;
  }

  const token = jwt.sign({ username, password }, jwtPass);

  res.json({ token, })

})


app.listen(3000, () => {
  console.log(" Server is live on PORT 3000")
})
