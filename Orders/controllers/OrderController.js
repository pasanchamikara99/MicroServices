const express = require("express");
const app = express();

const Order = require("../models/Order");

const placeOrder = (req, res) => {
  const order = new Order(req.body);

  order
    .save()
    .then((order) => res.status(200).json(order))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const viewOrders = async (req, res) => {
  const userId = req.params.id;

  const books = await Order.find({ customerID: userId }).exec();

  if (books.length > 0) {
    res.status(200).json(books);
  } else {
    res.status(404).json({ error: "No orders found" });
  }
};

module.exports = {
  placeOrder,
  viewOrders,
};
