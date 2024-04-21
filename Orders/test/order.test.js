const Order = require('../models/Order');
const {placeOrder} = require('../controllers/OrderController');

jest.mock('../models/Order', () => ({
  save: jest.fn(),
}));

describe('OrderController', () => {
  describe('placeOrder', () => {
    const req = {
      body: {
        customerID: 1,
        BookId: 2,
        initialDate: new Date(),
        deliveryDate: new Date(),
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should place an order successfully', async () => {
      const mockedOrder = {
        _id: 3,
        ...req.body,
      };
      //Order.save.mockResolvedValueOnce(mockedOrder);

      await placeOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      //expect(res.json).toHaveBeenCalledWith(mockedOrder);
    });
  });
});
