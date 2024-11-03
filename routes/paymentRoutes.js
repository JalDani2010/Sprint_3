// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Define the checkout session route
router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;
