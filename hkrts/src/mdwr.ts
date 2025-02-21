import express, { Response, Request, NextFunction } from 'express';
import { Kidneytype } from './types/types';

const app = express();
const PORT: number = 3840;
app.use(express.json(), calculateRequest);

let totalReq = 0;

function calculateRequest(req: Request, res: Response, next: NextFunction): void {
  totalReq++;
  console.log("total request are : ", totalReq);
  next();
}


app.post('/get-mdwr', (req: Request, res: Response): void => {

  const bodyData: Kidneytype = req.body.arg;

  console.log(bodyData);
  res.json({
    msg: "msg reached succesfully"
  })
})

app.get('/get-mdwr', (req: Request, res: Response) => {
  res.send("page get-mdwr");
})

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
})
