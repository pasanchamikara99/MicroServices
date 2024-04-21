const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

router.post("/placeorder", orderController.placeOrder);
router.get("/vieworders/:id", orderController.viewOrders);

module.exports = router;
