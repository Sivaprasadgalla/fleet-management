const mongoose = require("mongoose");

const DriverExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
    expenses: [
      {
       
        expenseName: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("DriverExpense", DriverExpenseSchema);
