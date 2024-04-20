const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  BookId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  initialDate: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
