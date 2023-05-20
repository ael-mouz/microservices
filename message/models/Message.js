const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: [true, "Sender is required"],
      minlength: [5, "Sender must be at least 5 characters"],
      maxlength: [100, "Sender cannot be more than 100 characters"],
      validate: {
        validator: (value) => /^[a-zA-Z\s]+$/.test(value),
        message: "Sender can only contain letters and spaces",
      },
    },
    recipient: {
      type: String,
      required: [true, "Recipient is required"],
      minlength: [5, "Recipient must be at least 5 characters"],
      maxlength: [100, "Recipient cannot be more than 100 characters"],
      validate: {
        validator: (value) => /^[a-zA-Z\s]+$/.test(value),
        message: "Recipient can only contain letters and spaces",
      },
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);