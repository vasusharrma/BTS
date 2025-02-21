import express, { Request, Response, NextFunction } from 'express';
import { Kidneytype } from './types/types';
import z from 'zod';


const app = express();
const PORT = 8000;
const schema = z.array(z.object({
  "healthy": z.boolean(),
}))

app.use(express.json());
app.post('/body-checkup', (req: Request, res: Response): void => {


  const response = schema.safeParse(req.body)
  if (!response.success) {
    res.status(400).json({ error: response.error.format() });
    return; // Ensures the function stops execution
  }
  const kidneys: Kidneytype = response.data;

  const kidneyLength = kidneys.length;
  res.send("Your kindey length is : " + kidneyLength);

})

app.use(function(err: unknown, req: Request, res: Response, next: NextFunction): void {
  console.error(err);
  if (err instanceof Error) {
    res.status(500).json({ error: err })
  }
  else {
    res.status(500).json({ err: "something up with our server" })
  }
})

app.listen(PORT);
