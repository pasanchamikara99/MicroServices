const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookController");

router.get("/book/getbook/:id", bookController.getBook);
router.get("/book/getallbooks", bookController.getallbooks);
router.delete("/book/deletebook/:id", bookController.deleteBook);
router.post("/book/addbook", bookController.addbook);

module.exports = router;
