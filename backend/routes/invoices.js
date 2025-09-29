// routes/invoices.js
const express = require('express');
const multer = require('multer');
const Papa = require('papaparse');
const Invoice = require('../models/Invoice');
const router = express.Router();

// Memory storage since I  just parse then discard
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to string
    const csvData = req.file.buffer.toString('utf8');

    // Wrap Papa.parse in a Promise to handle it properly
    const parseCSV = () => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    };

    // Wait for CSV parsing to complete
    const parsedData = await parseCSV();

    // Map rows into Invoice schema format
    const invoices = parsedData.map((row) => ({
      InvoiceNo: row.InvoiceNo,
      StockCode: row.StockCode,
      Description: row.Description,
      Quantity: parseInt(row.Quantity, 10) || 0,
      InvoiceDate: new Date(row.InvoiceDate),
      UnitPrice: parseFloat(row.UnitPrice) || 0,
      CustomerID: row.CustomerID,
      Country: row.Country,
    }));

    // Filter out any invalid entries
    const validInvoices = invoices.filter(
      (inv) => inv.InvoiceNo && inv.StockCode && inv.Description
    );

    if (validInvoices.length === 0) {
      return res.status(400).json({ message: 'No valid invoice data found in CSV' });
    }

    // Efficient bulk insert into MongoDB
    const result = await Invoice.insertMany(validInvoices, { ordered: false });

    res.json({
      message: 'Invoices uploaded successfully',
      count: result.length,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Error uploading invoices',
      error: error.message 
    });
  }
});

module.exports = router;