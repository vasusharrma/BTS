import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import todoroute from './llb/todoroute';
import { connectDb } from './llb/config/userDb';

dotenv.config();


const app = express();
const PORT = 5000;
app.use(express.json());

app.use('/api/v1', todoroute);

app.listen(PORT, (): void => {
  console.log(`server is live on port ${PORT}`)
})

connectDb();

app.get('/', (req: Request, res: Response): void => {
  res.send(`<h1>Homepage</h1>`)
})

