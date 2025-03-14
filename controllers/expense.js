import { ExpensesModel } from "../models/expense.js";
import { addExpensesValidator } from "../validators/expense.js";

// export const addBook = async (req, res) => {
//   const addABook = await LibraryModel.find({});
//   res.status(200).json({message: 'Book created successfully' });
// };
// export const addExpense = async (req, res, next) => {
//   try {
//   //   const newExpense = new ExpensesModel(req.body); // create a new book instance with the data sent in the request body
//   //   await newExpense.save(); // save the new book to the database
//   //   res
//   //     .status(201)
//   //     .json({ message: "Expense created successfully", expense: newExpense });
//   // } catch (error) {
//   //   res
//   //     .status(400)
//   //     .json({ message: "Error adding expense", error: error.message });
//   }
// };

export const addExpense = async (req, res, next) => {
  // try {
  //   const newBook = new LibraryModel(req.body); // create a new book instance with the data sent in the request body
  //   await newBook.save(); // save the new book to the database
  //   res.status(201).json({ message: 'Book created successfully', book: newBook });
  // } catch (error) {
  //   res.status(400).json({ message: 'Error adding book', error: error.message });
  // }
  try {
    const { error, value } = addExpensesValidator.validate(
      {
        ...req.body,
      },
      { abortEarly: false }
    );
    if (error) {
      return res.status(422).json(error);
    }
    const result = await ExpensesModel.create(value);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;
    //ferch products from database
    const result = await ExpensesModel.find(JSON.parse(filter)).sort(
      JSON.parse(sort)
    );
    //return response
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getExpenseById = async (req, res) => {
  const oneExpense = await ExpensesModel.findById(req.params.id);
  res.status(200).json({ Expense: oneExpense });
};
export const updatePartExpense = async (req, res, next) => {
  try {
    const result = await ExpensesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deleteExpenseById = async (req, res) => {
  const deleteExpense = await ExpensesModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted expense successfully");
};
