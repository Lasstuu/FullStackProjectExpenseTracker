const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add text");
    }
    if (!req.body.amount) {
        res.status(400);
        throw new Error("Please add amount");
    }
    if (!req.body.category) {
        res.status(400);
        throw new Error("Please select a category");
    }
    
    const expense = await Expense.create({
        text: req.body.text,
        amount: req.body.amount,
        category: req.body.category,
        user: req.user.id
    });
    res.status(201).json(expense);
});

const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(400);
        throw new Error("Expense not found");
    }
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    if (expense.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
});

const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
        res.status(400);
        throw new Error("Expense not found");
    }
    
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    if (expense.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json({ message: `Expense ${req.params.id} deleted` });
});


module.exports = { 
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};