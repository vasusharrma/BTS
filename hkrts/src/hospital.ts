import { User, Kidneytype } from "./types/types";
import express, { Request, Response } from "express"
import bodyParser from 'body-parser'


const app = express();
const PORT = 4444;
app.use(bodyParser.json());

const user: User[] = [{
  name: "Baklasur",
  kidneys: [{
    healthy: true
  }, {
    healthy: true
  }, {
    healthy: false
  }]
}]

function knowKidneys(): { uname: string, hkidneys: number, tkidneys: number, ukidneys: number } {
  var hkidneys: number = 0;
  var tkidneys: number = 0;
  var ukidneys: number = 0;

  const i = user[0];
  const uname = i.name;
  tkidneys = i.kidneys.length;
  const healthykidney = i.kidneys.filter((e) => e.healthy
  )
  hkidneys = healthykidney.length;
  ukidneys = tkidneys - hkidneys;
  return { uname, hkidneys, tkidneys, ukidneys };
}

function addKidneys(arg: Kidneytype) {
  user[0].kidneys = [...user[0].kidneys, ...arg];
}


app.get('/', (req: Request, res: Response): void => {
  const { ukidneys, uname, hkidneys, tkidneys } = knowKidneys();
  res.json({
    username: uname,
    totalkindneys: tkidneys,
    totalHealthyKidneys: hkidneys,
    totalunhealthykindeys: ukidneys
  })
})


app.post('/', (req: Request, res: Response): void => {
  const arg: Kidneytype = req.body.arg;
  addKidneys(arg);
  res.json({ msg: "Done" })
})

app.put('/', (req: Request, res: Response): void => {

  if (isKidneyUnhealtyAvailable()) {
    res.status(411).send("There is no unhealthy kidney");
  }
  else {
    for (const i of user[0].kidneys) {
      i.healthy = true;
    }
    res.json({ msg: "put req done" });

  }

})




app.delete('/', (req: Request, res: Response): void => {

  const kidneytodelete = Number(req.query.td);

  if (isKidneyDeleteAvailable(kidneytodelete)) {

    res.status(411).send("There is no kidney to delete");
  }

  else {
    for (let i = 0; i < kidneytodelete; i++) {
      user[0].kidneys.pop();
    }
    res.json({ msg: "delete req done" });

  }
})

app.listen(PORT, (): void => {
  console.log(`server is linstening on port ${PORT} `);
});

function isKidneyDeleteAvailable(kidneytodelete: number): boolean {
  let isKDA = false;

  if (user[0].kidneys.length - kidneytodelete < 0) {
    isKDA = true;
  }
  return isKDA;
}

function isKidneyUnhealtyAvailable(): boolean {
  var isKUA: boolean = true;
  for (const i of user[0].kidneys) {
    if (i.healthy === false) {
      isKUA = false;
    }
  }
  return isKUA;
}
