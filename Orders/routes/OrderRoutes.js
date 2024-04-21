const express = require("express");
const router = express.Router();

const orderController = require("../controller/orderController");

router.get("/getorder/:id", orderController.getOrder);
router.get("/getallorders", orderController.getAllOrders);
router.delete("/deleteorder/:id", orderController.deleteOrder);
router.post("/addorder", orderController.addOrder);

module.exports = router;
