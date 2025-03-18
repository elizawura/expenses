import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import expenseRouter from "./routes/expense.js";
import userRouter from "./routes/user.js";

await mongoose.connect(process.env.MONGO_URI);

//create an express app
const app = express();

//use global middlewares
app.use(express.json());
app.use(cors());
app.use(expenseRouter);
app.use(userRouter);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
