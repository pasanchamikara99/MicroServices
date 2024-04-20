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

module.exports = {
  placeOrder,
};
