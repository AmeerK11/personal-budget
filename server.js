const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const BudgetItem = require('./models/BudgetItem');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/personal_budget';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.error(' MongoDB connection error:', err));

// GET endpoint - fetch all budget data
app.get('/budget', async (req, res) => {
  try {
    const items = await BudgetItem.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST endpoint - add a new budget item
app.post('/budget', async (req, res) => {
  try {
    const { title, value, color } = req.body;
    const newItem = new BudgetItem({ title, value, color });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))