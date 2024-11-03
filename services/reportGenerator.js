// services/reportGenerator.js
const PDFDocument = require("pdfkit");
const Transaction = require("../models/Transaction");

exports.generateDonationReport = async (ngoId) => {
  const transactions = await Transaction.find({ ngoId });

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    // Collect the generated PDF chunks
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData); // Resolve with the complete PDF data
    });
    
    doc.on("error", (err) => {
      reject(err); // Reject if there's an error
    });

    // Write content to the PDF
    doc.fontSize(20).text("Donation Report", { align: "center" });
    doc.moveDown();

    transactions.forEach((transaction) => {
      doc
        .fontSize(12)
        .text(`Transaction ID: ${transaction._id}`)
        .text(`Amount: ${transaction.amount}`)
        .text(`Status: ${transaction.status}`)
        .text(`Date: ${transaction.transactionDate}`)
        .moveDown();
    });

    // Finalize the PDF file
    doc.end();
  });
};
