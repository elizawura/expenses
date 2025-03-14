import Joi from "joi";

export const addExpensesValidator = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
});
