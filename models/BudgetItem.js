const mongoose = require('mongoose');

// enforce color to be valid hex code (#RRGGBB)
const hexColorRegex = /^#([A-Fa-f0-9]{6})$/;

const BudgetItemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  value: { type: Number, required: true, min: 0 },
  color: { type: String, required: true, match: hexColorRegex }
});

module.exports = mongoose.model('BudgetItem', BudgetItemSchema);
