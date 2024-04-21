const express = require("express");
const app = express();
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try{
    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.status(201).json(result);
  }
  catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }

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
