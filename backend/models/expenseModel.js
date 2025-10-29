const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a number value"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
        values: ["Living Costs", "Amusements/Hobbies", "Miscellaneous"],
        message: "Category must be one of: Living Costs, Amusements/Hobbies, or Miscellaneous"
      },
      default: "Miscellaneous"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
