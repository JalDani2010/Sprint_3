// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const donationRoutes = require("./routes/donationRoutes");
const billingRoutes = require("./routes/billingRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // New payment route
const mongoose = require("mongoose");
const connectDB = require("./db/connection");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.static("public"));

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/payment", paymentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
