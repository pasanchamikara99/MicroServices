const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/getuser/:id", userController.getUserByID);
router.get("/getallusers", userController.getAllUsers);
router.post("/adduser", userController.addUser);
router.delete("/deleteuser/:id", userController.deleteUser);
router.patch("/updateuser/:id", userController.updateUser);

module.exports = router;
