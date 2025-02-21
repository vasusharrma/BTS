import express, { Request, Response, NextFunction } from 'express';
import z from 'zod'

let zodItems: number[] = [2, 3, 4, 5];

const app = express();
const PORT = 5000;
const schema = z.array(z.number());


function userMiddleware(req: Request, res: Response, next: NextFunction): void {

  const password = req.headers.password as string;
  const username = req.headers.username as string;

  if (!(password === "pass" && username === "vasusharrmaa")) {
    res.status(401).json({ msg: "user is not authorized" });
  }
  else {
    next();
  }
}


app.use(express.json(), userMiddleware);


app.put('/zod-increase', (req: Request, res: Response, next: NextFunction): void => {

  const response = schema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({ msg: response.error.format() });
    return;
  }

  const rzodItems = response.data;

  zodItems = [...zodItems, ...rzodItems];
  const zodItemslength = zodItems.length;
  res.json({ resposne: `zodItems lenght is ${zodItemslength}` });
})

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send("zod homepage");
})

app.use(function(err: unknown, req: Request, res: Response, next: NextFunction): void {
  console.error("error", err);
  if (err instanceof Error) {
    res.status(400).json({
      error: err
    })
  }
  else {
    res.status(500).json({ error: "something up with our server" });
  }
})

app.listen(PORT);


