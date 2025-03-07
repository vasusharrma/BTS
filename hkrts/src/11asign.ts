import express, { Request, Response, NextFunction } from 'express'

let totalRequest = 0;

const app = express();

function totalReqMiddleware(req: Request, res: Response, next: NextFunction) {
  totalRequest++;
  console.log("total req are : ", totalRequest);
  next();
}

app.use(express.json(), totalReqMiddleware);

app.get('/', (req: Request, res: Response): void => {
  res.send("homepage");
});

app.get('/secondpage', (req: Request, res: Response): void => {
  res.send("secondpage");
});




app.listen(7500);
