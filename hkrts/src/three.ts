import { User, Kidneytype } from "./types/types";
import express, { Request, Response } from "express"

const app = express();
const PORT = 4444;

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



app.listen(PORT, (): void => {
  console.log(`server is linstening on port ${PORT} `);
});
