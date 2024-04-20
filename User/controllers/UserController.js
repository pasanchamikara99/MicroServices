const express = require("express");
const User = require("../models/User");

const getUserByID = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData); // Create a new instance of the User model with the request body data
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Respond with the saved user data
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  User.findByIdAndUpdate(id, userData, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  getUserByID,
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
