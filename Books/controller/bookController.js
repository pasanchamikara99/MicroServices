const express = require("express");
const Book = require("../models/Book");

const addbook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book); // Respond with the saved user data
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getallbooks = async (req, res) => {
  const books = await Book.find();

  if (books.length > 0) {
    res.status(200).json(books);
  } else {
    res.status(404).json({ error: "No books found" });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((book) => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "book not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addbook,
  getBook,
  getallbooks,
  deleteBook,
};
