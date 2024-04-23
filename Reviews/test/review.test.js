const {
    addReview,
    getReview,
    getAllReviews,
    deleteReview,
  } = require("../controllers/reviewController");
  const Review = require("../models/Review");
  
  jest.mock("../models/Review");
  
  describe("Review API endpoints", () => {
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
  
    it("should add a new review", async () => {
      req.body = {
        customerID: "CustomerID123",
        bookID: "BookID456",
        rating: 4,
        comment: "Great book!",
      };
  
      await addReview(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      //expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });
  
    it("should get a review by ID", async () => {
      const mockedReview = {
        _id: 1,
        customerID: "CustomerID123",
        bookID: "BookID456",
        rating: 4,
        comment: "Great book!",
        date: new Date(),
      };
  
      req.params = { id: mockedReview._id };
  
      Review.findById.mockResolvedValueOnce(mockedReview);
  
      await getReview(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedReview);
    });
  
    it("should get all reviews", async () => {
      const mockedReviews = [
        {
          _id: 1,
          customerID: "CustomerID123",
          bookID: "BookID456",
          rating: 4,
          comment: "Great book!",
          date: new Date(),
        },
        {
          _id: 2,
          customerID: "CustomerID789",
          bookID: "BookID012",
          rating: 5,
          comment: "Awesome!",
          date: new Date(),
        },
      ];
  
      Review.find.mockResolvedValueOnce(mockedReviews);
  
      await getAllReviews(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedReviews);
    });
  
    it("should delete a review by ID", async () => {
      const mockedReviewId = "6624ac31c7ebe2d433001286";
  
      req.params = { id: mockedReviewId };
  
      Review.findByIdAndDelete.mockResolvedValueOnce(true);
  
      await deleteReview(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(true);
    });
  });
  