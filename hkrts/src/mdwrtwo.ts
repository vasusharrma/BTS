import express, { Request, Response, NextFunction } from 'express'


const app = express();
app.use(express.json(), ticketCheck);
const PORT = 7500;

function ticketCheck(req: Request, res: Response, next: NextFunction): void {

  const ticket = req.query.ticket;
  if (ticket === 'free') {
    next();
  }
  else {
    res.json({ msg: "you don't have ticket to get a ride " })
    return;
  }

}


app.get('/ride1', (req: Request, res: Response): void => {

  res.json({ msg: "succesfully riden ride 1" });

})

app.get('/ride2', (req: Request, res: Response): void => {

  res.json({ msg: "succesfully riden ride 2" });

})

app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}`);
})
