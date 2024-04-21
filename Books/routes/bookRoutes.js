const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookController");

router.get("/getbook/:id", bookController.getBook);
router.get("/getallbooks", bookController.getallbooks);
router.delete("/deletebook/:id", bookController.deleteBook);
router.post("/addbook", bookController.addbook);

module.exports = router;
