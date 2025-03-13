import { Request, Response } from 'express'
import TDUser from '../models/Todo'
import z from 'zod'



const reqresSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  age: z.number(),
  createdAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  updatedAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
})

async function createTodo(req: Request, res: Response): Promise<void> {

  const reqData = reqresSchema.safeParse(req.body);

  if (!reqData.success) {
    res.status(401).json({ err: reqData.error.format() });
    return;
  }

  try {

    const { name, email, password, age, createdAt, updatedAt } = reqData.data;

    const newUser = new TDUser({ name, email, password, age, createdAt, updatedAt });
    await newUser.save();
    res.status(200).json({ msg: "User saved succesfully" });

  }
  catch (err) {
    res.status(500).json({ error: err });
  }

}
