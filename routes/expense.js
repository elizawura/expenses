import { Router } from "express";
import {
  addExpense,
  deleteExpenseById,
  getExpenseById,
  getExpenses,
  updatePartExpense,
} from "../controllers/expense.js";

const expenseRouter = Router();

//define routes
expenseRouter.post("/expenses", addExpense);

expenseRouter.get("/expenses", getExpenses);

expenseRouter.get("/expenses/:id", getExpenseById);

expenseRouter.delete("/expenses/:id", deleteExpenseById);

expenseRouter.patch("/expenses/:id", updatePartExpense);

//export router
export default expenseRouter;
