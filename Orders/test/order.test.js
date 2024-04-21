const mongoose = require("mongoose");
const { addOrder, getOrder, getAllOrders, deleteOrder } = require("../controller/orderController");
const Book = require("../models/Order");

jest.mock("../models/Order");

describe("Order API endpoints", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new order", async () => {
    req.body = {
      customerID: "CustomerID123",
      BookId: "BookID456",
      initialDate: new Date(),
      deliveryDate: new Date(),
    };
    
    await orderController.addOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    //expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it("should get an order by ID", async () => {
    const mockedOrder = {
      _id: 1,
      customerID: "CustomerID123",
      BookId: "BookID456",
      initialDate: new Date(),
      deliveryDate: new Date(),
    };

    req.params = { id: mockedOrder._id };

    Order.findById.mockResolvedValueOnce(mockedOrder);

    await orderController.getOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedOrder);
  });

  it("should get all orders", async () => {
    const mockedOrders = [
      {
        _id: 1,
        customerID: "CustomerID123",
        BookId: "BookID456",
        initialDate: new Date(),
        deliveryDate: new Date(),
      },
      {
        _id: 2,
        customerID: "CustomerID789",
        BookId: "BookID012",
        initialDate: new Date(),
        deliveryDate: new Date(),
      },
    ];

    Order.find.mockResolvedValueOnce(mockedOrders);

    await orderController.getAllOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedOrders);
  });

  it("should delete an order by ID", async () => {
     const mockedOrderId = '6624ac31c7ebe2d433001286';

     req.params = { id: mockedOrderId };

     Order.findByIdAndDelete.mockResolvedValueOnce(true);

     await orderController.deleteOrder(req, res);

     expect(res.status).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith(true);
   });
});
