import express, { Request, Response } from 'express';
import bodyParser from "body-parser"
import path from 'path'
import { readFile } from 'fs'

const app = express();


app.use(bodyParser.json());


app.get('/', (req: Request, res: Response): void => {
  const PATH: string = path.join(__dirname, "/sample.txt");
  readFile(PATH, 'utf-8', (err, data) => {

    if (err) {
      return res.status(500).json({ error: "Got error while looking for the file" })
    }
    res.json({ content: data });
  })


})


app.get('/student/:name/:cuid', (req: Request, res: Response): void => {
  const { cuid, name } = req.params;
  res.send(`<h1>The student is ${name} & his cuid is ${cuid}</h1>`)
})

app.post('/api/conversation', (req: Request, res: Response): void => {
  const students: object = req.body;
  console.log(students);
  res.json({ "message": "Data reached succesfully" })
})

const PORT: number = 9000;

app.listen(PORT, () => {
  console.log(`server is linstining on port ${PORT}`);
})














