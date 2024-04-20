const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

router.post("/order/placeorder", orderController.placeOrder);

module.exports = router;
