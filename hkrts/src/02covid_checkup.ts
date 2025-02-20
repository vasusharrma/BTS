import express, { Request, Response, NextFunction } from 'express'

const app = express();
const PORT = 3800;


function userMiddleware(req: Request, res: Response, next: NextFunction): void {

  const username = req.headers.username as string;
  const password = req.headers.password as string;


  if (!(username === "vasusharrmaa" && password === "pass")) {
    res.status(411).json({ msg: "not a valid user" });
  }
  else {
    next();
  }

}


function kidneyMiddleware(req: Request, res: Response, next: NextFunction): void {
  const kidneyId = Number(req.query.kidneyId);

  if (!(kidneyId == 1 || kidneyId == 2)) {
    res.status(411).json({
      msg: "enter valid kidneyId"
    })
  }
  else {
    next();
  }

}

app.get('/heart-checkup', userMiddleware, kidneyMiddleware, (req: Request, res: Response): void => {

  res.send("Your hearth is healthy");
})


app.get('/kidney-checkup', userMiddleware, kidneyMiddleware, (req: Request, res: Response): void => {
  res.send("Your kidney is healthy");
})

app.listen(PORT, (): void => {
  console.log(`server is running on PORT ${PORT}`);
});





