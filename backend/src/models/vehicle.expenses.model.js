const mongoose = require("mongoose");

const VehicleExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vehicle",
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


module.exports =mongoose.model('VehicleExpense',VehicleExpenseSchema)
