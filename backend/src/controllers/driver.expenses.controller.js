const DriverExpense = require("../models/driver.expenses.model");
const { validationResult } = require("express-validator");

const createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "All Fileds Are Required",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const { userId, driverId, expenses } = req.body;
    let driverExpense = await DriverExpense.findOne({
      user: userId,
      driver: driverId,
    });

    if (!driverExpense) {
      driverExpense = await DriverExpense.create({
        user: userId,
        driver: driverId,
        expenses: expenses,
      });
    } else {
      driverExpense.expenses.push(...expenses);
      await driverExpense.save();
    }

    res.status(201).json({
      message: "Driver Expenses Added Successfully",
      data: driverExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error Occured",
      error: error.message,
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const { userId, driverId } = req.query;
    const getExpenses = await DriverExpense.find({
      user: userId,
      driver: driverId,
    });
    res
      .status(200)
      .json({ message: "Driver Expenses Details", data: getExpenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error Occured", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "All Fileds Are Required",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const { userId, driverId, expenses } = req.body;

    const updatedExpense = await DriverExpense.findOneAndUpdate(
      {
        user: userId,
        driver: driverId,
        "expenses._id": expenses._id,
      },
      {
        $set: {
          "expenses.$.expenseName": expenses.expenseName,
          "expenses.$.date": expenses.date,
          "expenses.$.amount": expenses.amount,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Driver Expense not found",
      });
    }

    res.status(200).json({
      message: "Driver Expenses Updated Successfully",
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error Occured",
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, driverId } = req.query;

    const updatedExpense = await DriverExpense.findOneAndUpdate(
      {
        user: userId,
        driver: driverId,
        "expenses._id": id,
      },
      {
        $pull: {
          expenses: {
            _id: id,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense Deleted Successfully",
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error Occured",
      error: error.message,
    });
  }
};

module.exports = { createExpense, getExpense, updateExpense, deleteExpense };
