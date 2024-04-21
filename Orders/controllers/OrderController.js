const express = require("express");
const app = express();
const Order = require("../models/Order");

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.save();
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();

  if (orders.length > 0) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ error: "No orders found" });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  Order.findByIdAndDelete(id)
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  deleteOrder,
};
