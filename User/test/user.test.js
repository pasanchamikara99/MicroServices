const mongoose = require("mongoose");
const { getUserByID, addUser, getAllUsers, deleteUser, updateUser } = require("../controllers/UserController");
const User = require("../models/User");

jest.mock("../models/User"); // Mocking the User model

describe("User API endpoints", () => {
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

  it("should get a user by ID", async () => {
    const mockedUser = {
      _id: 'mockedUserId',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      createdAt: new Date(),
    };

    req.params = { id: mockedUser._id };

    User.findById.mockResolvedValueOnce(mockedUser);

    await getUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(mockedUser);
  });

  it("should handle user not found", async () => {
    User.findById.mockResolvedValueOnce(null);

    req.params = { id: 'nonExistingId' };

    await getUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    //expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should add a new user", async () => {
    req.body = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };
    
    const mockedUser = { ...req.body, _id: 'mockedUserId' };

    //User.save.mockResolvedValueOnce(mockedUser);

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    //expect(res.json).toHaveBeenCalledWith(mockedUser);
  });

  it("should get all users", async () => {
    const mockedUsers = [
      {
        _id: 'mockedUserId1',
        username: 'testuser1',
        email: 'test1@example.com',
        password: 'password1',
      },
      {
        _id: 'mockedUserId2',
        username: 'testuser2',
        email: 'test2@example.com',
        password: 'password2',
      },
    ];

    User.find.mockResolvedValueOnce(mockedUsers);

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(mockedUsers);
  });

  it("should delete a user by ID", async () => {
    const mockedUserId = 'mockedUserId';

    req.params = { id: mockedUserId };

    const mockedUser = {
      _id: mockedUserId,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      createdAt: new Date(),
    };

    User.findByIdAndDelete.mockResolvedValueOnce(mockedUser);

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(mockedUser);
  });

  it("should handle user not found when deleting", async () => {
    User.findByIdAndDelete.mockResolvedValueOnce(null);

    req.params = { id: 'nonExistingId' };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    //expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should update a user by ID", async () => {
    const mockedUserId = 'mockedUserId';

    req.params = { id: mockedUserId };
    req.body = {
      username: 'updatedusername',
      email: 'updated@example.com',
      password: 'updatedpassword',
    };

    const mockedUpdatedUser = {
      _id: mockedUserId,
      username: 'updatedusername',
      email: 'updated@example.com',
      password: 'updatedpassword',
      createdAt: new Date(),
    };

    User.findByIdAndUpdate.mockResolvedValueOnce(mockedUpdatedUser);

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(mockedUpdatedUser);
  });

  it("should handle user not found when updating", async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce(null);

    req.params = { id: 'nonExistingId' };

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    //expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});
