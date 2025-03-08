import express, { NextFunction, Request, Response } from 'express'

const PORT = 4000;
let noOfErrors = 0;

const app = express();
app.use(express.json());


app.get('/', (req: Request, res: Response): void => {
  throw new Error("lala");
  res.send('homepage');

})


app.use((err: unknown, req: Request, res: Response, next: NextFunction): void => {
  noOfErrors++;
  console.error("err: ", err);
  console.log(noOfErrors)
  if (err instanceof Error) {
    res.status(400).send({ error: err });
  }
  else {
    res.status(400).json({ err: "something up with our servers" })
  }
})

app.listen(PORT, () => {
  console.log(`live on ${PORT}`)
})

