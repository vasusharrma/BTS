import Users from '../models/Todo'
import { Request, Response } from 'express'
import z from 'zod'


const ztodoSchema = z.object(
  {
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    age: z.number(),
    createdAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
    updatedAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  }
)

const createTodo = async (req: Request, res: Response): Promise<void> => {

  const reqres = ztodoSchema.safeParse(req.body);

  if (!reqres.success) {
    res.status(400).json({ msg: reqres.error.format() })
    return;
  }

  try {

    const { name, email, password, age, createdAt, updatedAt } = reqres.data;

    const newTodo = new Users({ name, email, password, age, createdAt, updatedAt });
    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", data: newTodo });
  }
  catch (error) {

    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }

}





export { createTodo }
