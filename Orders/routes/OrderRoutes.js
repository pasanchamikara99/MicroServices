const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

router.get("/getorder/:id", orderController.getOrder);
router.get("/getallorders", orderController.getAllOrders);
router.delete("/deleteorder/:id", orderController.deleteOrder);
router.post("/addorder", orderController.addOrder);

module.exports = router;
