const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  InvoiceNo: { type: String, required: true },
  StockCode: { type: String, required: true },
  Description: { type: String, required: true },
  Quantity: { type: Number, required: true },
  InvoiceDate: { type: Date, required: true },
  UnitPrice: { type: Number, required: true },
  CustomerID: { type: String, required: true },
  Country: { type: String, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);