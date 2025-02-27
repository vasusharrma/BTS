import express, { Request, Response } from 'express'
import z from 'zod';
import { zodfuncitontyep } from './types/types';

const app = express();
const objschema = z.object({
  "name": z.string(),
  "email": z.string().email(),
  "arr": z.array(z.number())
});

app.use(express.json())

app.put('/zodfunc', function(req: Request, res: Response): void {

  const response = objschema.safeParse(req.body);

  if (!response.success) {
    res.status(400).json({ error: response.error.format() });
    return;
  }

  const zodobj: zodfuncitontyep = response.data;
  const { name, email, arr } = zodobj;
  res.send("name is : " + name + " \nemail is : " + email + "\narr is : " + arr);

})

app.listen(5400);
