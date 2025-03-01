import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { allUsers } from './types/types';


const app = express();
app.use(express.json());
const PORT = 4800;
const jwtpassword = "ram123"



const authSchema = z.object({
  username: z.string(),
  password: z.string()
});


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


function validUser(username: string, password: string): boolean {
  return ALL_USER.some(e => e.username === username && e.password === password);
}


app.post('/signin', (req: Request, res: Response): void => {

  const response = authSchema.safeParse(req.body);

  if (!response.success) {
    res.status(400).json({ msg: response.error.format() })
    return;
  }

  const { username, password } = response.data;

  if (!validUser(username, password)) {
    res.status(411).json({ msg: "User doen't exists in our database" });
    return;
  }

  const token = jwt.sign({ username }, jwtpassword);
  res.json({ token, })


})


app.get('/users', (req: Request, res: Response): void => {


  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "token is required" });
    return;
  }

  try {
    const decode = jwt.verify(token, jwtpassword) as jwt.JwtPayload;
    if (!decode.username) {
      res.status(401).json({ error: "invalid token data" });
      return;
    }
    const username = decode.username;


    const ALL_USER_FILTER = ALL_USER.filter(u => u.username !== username);

    res.send(ALL_USER_FILTER);

  }
  catch (error) {
    res.status(403).json({ error: "invalid token" });
  }
})

app.listen(PORT, (): void => {
  console.log(`server is live on PORT ${PORT}`);
})






















