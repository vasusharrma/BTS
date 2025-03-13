import express from 'express'
import { createTodo } from './controllers/createTodo';

const router = express.Router();


//define API routes


router.post("/createTodo", createTodo);


export default router


