//describe("bookController", () => {
//  describe("addbook", () => {
//    test("validate", () => {});
//  });
//});

const mongoose = require("mongoose");
const { addbook, getBook, getallbooks, deleteBook } = require("../controller/bookController");
const Book = require("../models/Book");

jest.mock("../models/Book"); // Mocking the Book model

describe("Book API endpoints", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should add a new book", async () => {
    req.body = {
      title: "Test Book",
      author: "Test Author",
      noOfPages: 200,
      price: 20,
    };
    
    await addbook(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    //expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it("should get a book by ID", async () => {
    const mockedBook = {
      _id: 1,
      title: "Test Book",
      author: "Test Author",
      noOfPages: 200,
      price: 20,
    };

    req.params = { id: mockedBook._id };

    Book.findById.mockResolvedValueOnce(mockedBook);

    await getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedBook);
  });

  it("should get all books", async () => {
    const mockedBooks = [
      {
        _id: 1,
        title: "Test Book 1",
        author: "Test Author 1",
        noOfPages: 200,
        price: 20,
      },
      {
        _id: 2,
        title: "Test Book 2",
        author: "Test Author 2",
        noOfPages: 300,
        price: 30,
      },
    ];

    Book.find.mockResolvedValueOnce(mockedBooks);

    await getallbooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedBooks);
  });

  it("should delete a book by ID", async () => {
     const mockedBookId = '6624ac31c7ebe2d433001286';

     req.params = { id: mockedBookId };

     Book.findByIdAndDelete.mockResolvedValueOnce(true); // Mocking successful deletion

     await deleteBook(req, res);

     expect(res.status).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith(true);
   });
});
