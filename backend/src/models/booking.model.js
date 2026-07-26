const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true
    },

    pickupLocation: {
      type: String,
      required: true
    },

    dropLocation: {
      type: String,
      required: true
    },

    pickupDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date
    },

    bookingType: {
      type: String,
      enum: ["One Way", "Round Trip"],
      default: "One Way"
    },

    totalDistance: {
      type: Number
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending"
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Ongoing",
        "Completed",
        "Cancelled"
      ],
      default: "Pending"
    },

    remarks: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);