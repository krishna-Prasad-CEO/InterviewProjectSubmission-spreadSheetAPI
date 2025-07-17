import mongoose from "mongoose";

const CellSchema = new mongoose.Schema({
  cellId: { type: String, required: true },
  value: { type: String, default: null },
  formula: { type: String, default: null },
});

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  cells: [CellSchema],
});

module.exports = mongoose.model("Customer", CustomerSchema);
