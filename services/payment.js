// services/payment.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.processPayment = async (amount, paymentMethod) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, transactionId: order.id };
  } catch (error) {
    console.error("Payment processing error:", error);
    return { success: false };
  }
};
