import express, { Request, Response } from "express";
import dotenv from "dotenv"
import bodyPareser from 'body-parser'
import fs from 'fs'
import path from 'path'


const app = express();


//middleware
app.use(bodyPareser.json());
dotenv.config();

app.get('/', (req: Request, res: Response): void => {
  const filePath = path.join(__dirname, "sample.txt");
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }
    res.json({ content: data });
  })

});

app.post('/api/conversation', (req: Request, res: Response): void => {
  const students = req.body.students;
  console.log(students);
  res.json({
    response: "I got your message"
  })
})




const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => {
  console.log(`server is listening on port ${PORT}`)
})











