import express, { Request, Response, NextFunction } from 'express'

const app = express();
const PORT = 8000;

let noOfReqPerUser: Record<string, number> = {
};


app.use(function(req: Request, res: Response, next: NextFunction) {
  const user = req.headers['user-id'] as string;
  if (noOfReqPerUser[user]) {
    noOfReqPerUser[user]++;
    if (noOfReqPerUser[user] > 5) {
      res.status(401).json({ msg: "you requested so many times , now you are blocked" })
      return;
    }
    else {
      next();
    }
  }
  else {
    noOfReqPerUser[user] = 1;
    next();
  }
})

setInterval(() => {
  noOfReqPerUser = {}
}, 1000);


app.get('/', (req: Request, res: Response): void => {
  res.send("Homepage");
})


app.listen(PORT, () => {
  console.log(`live on ${PORT}`)
})

