import express, { Request, Response } from "express"

const app = express();

const PORT: number = 4000;

function getProduct(a: number, b: number): number {
  const product: number = a * b;
  return product;
}

function calcSum(a: number): number {
  let sum: number = 0;
  for (let i: number = a; i > 0; i--) {
    sum += i;
  }
  return sum;
}

app.get('/', (req: Request, res: Response) => {
  res.send("Hello homepage")
})

app.get("/wantProduct/:firstN/:secondN", (req: Request, res: Response): void => {

  const { sum_thing } = req.query;

  const { firstN, secondN } = req.params;
  const pro_duct = getProduct(Number(firstN), Number(sum_thing));
  const totalsum = calcSum(Number(secondN));
  res.send(`The product is ${pro_duct.toString()} \n  the sum is ${totalsum.toString()}`);

})


app.listen(PORT, (): void => {
  console.log(`Server is live on PORT ${PORT}`);
})


