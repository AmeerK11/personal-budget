const mongoose = require('mongoose');
const BudgetItem = require('./models/BudgetItem');
const data = require('./budget.json');

const MONGO_URI = 'mongodb://localhost:27017/personal_budget';

async function seedDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB, seeding data...');

  await BudgetItem.deleteMany({});
  await BudgetItem.insertMany(data);
  console.log('✅ Inserted data from budget.json');

  await mongoose.disconnect();
  console.log('Database seeded and disconnected');
}

seedDatabase().catch(err => console.error(err));
