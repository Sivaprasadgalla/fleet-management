const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      lowercase: true
    },

    address: {
      type: String
    },

    city: {
      type: String
    },

    state: {
      type: String
    },

    pincode: {
      type: String
    },

    companyName: {
      type: String
    },

    customerType: {
      type: String,
      enum: ["Individual", "Corporate"],
      default: "Individual"
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", customerSchema);