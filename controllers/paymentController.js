// controllers/paymentController.js
const paymentService = require('../services/payment');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentResult = await paymentService.processPayment(amount);

    if (paymentResult.success) {
      res.status(200).json({
        success: true,
        orderId: paymentResult.transactionId,
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR"
      });
    } else {
      res.status(500).json({ success: false, error: "Payment processing failed" });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
