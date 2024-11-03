// controllers/donationController.js
const paymentService = require("../services/payment"); 
const receiptGenerator = require("../services/receiptGenerator"); 
const Donation = require("../models/Donation"); 


exports.processDonation = async (req, res) => {
  try {
    const { amount, donorId, paymentMethod } = req.body;

   
    const paymentResult = await paymentService.processPayment(amount, paymentMethod);

    if (!paymentResult.success) {
      return res.status(400).json({ error: "Payment processing failed." });
    }

    
    const donation = await Donation.create({
      amount,
      donorId,
      transactionId: "202201315",
      status: "Completed",
    });

    
    const receipt = await receiptGenerator.generateReceipt(donation);

    res.status(201).json({ message: "Donation processed successfully", receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getDonationRecords = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donations = await Donation.find({ donorId });
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve donation records" });
  }
};
