// routes/donationRoutes.js
const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.post("/donate", donationController.processDonation);
router.get("/:donorId", donationController.getDonationRecords);

module.exports = router;
