const PayPalService = require('../services/paypal.service');

// Initialize PayPal service
const paypalService = new PayPalService({
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_SECRET,
  environment: process.env.PAYPAL_MODE === 'production' ? 'live' : 'sandbox'
});

// Create order endpoint
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    const order = await paypalService.createOrder(amount, currency);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Capture payment endpoint
exports.captureOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    
    const captureData = await paypalService.captureOrder(orderId);
    res.json(captureData);
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({ error: 'Failed to capture payment' });
  }
};
