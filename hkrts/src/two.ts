import express, { Request, Response } from "express"

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.send("Ram is God || God is Ram")
})


app.get('/asd?a=vasu&b=shivang&c=vaishali', (req: Request, res: Response): void => {
  const { a, b, c } = req.query;
})
