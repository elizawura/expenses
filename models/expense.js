// import { required } from "joi";
import { Schema, model, modelNames } from "mongoose";
import normalize from "normalize-mongoose";

const expensesSchema = new Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

expensesSchema.plugin(normalize);
export const ExpensesModel = model("Expense", expensesSchema);
