import express, { Request, Response } from 'express'



const app = express();
const PORT = 3000;

function kidneyValidator(kidneyId: number): boolean {
  let validKidney = true;

  if (!(kidneyId === 1 || kidneyId === 2)) {
    validKidney = false;
  }

  return validKidney;
}

function userValidator(username: string, password: string): boolean {
  let validUser = true;

  if (!(username === "vasusharrmaa" && password === "pass")) {
    validUser = false;
  }

  return validUser;
}

app.get('/health-checkup', (req: Request, res: Response): void => {

  const username = req.headers.username as string;
  const password = req.headers.password as string;
  let kidneyId = Number(req.query.kidneyId);
  let validKidney = kidneyValidator(kidneyId);
  let validUser = userValidator(username, password);


  if (!validUser) {
    res.status(403).json({
      msg: "usr doens't exist"
    })
    return;
  }


  if (!validKidney) {
    res.status(400).json({ error: "enter a valid kidneyId" });
    return;
  }

  res.send("Your hearth & kidneys are healthy");


})



app.listen(PORT, (): void => {
  console.log(`Server is live on PORT ${PORT}`)
})
