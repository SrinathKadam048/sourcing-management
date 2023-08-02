const mongoose = require('mongoose');
const Item = require('./models/item');

const defaultItems = [
    { item: 'iPhone', code: 'IPH101', quantity: 60, price: 500000 },
    { item: 'Chargers', code: 'CHG201', quantity: 80, price: 600000 },
    { item: 'Samsung', code: 'SMG301', quantity: 70, price: 700000 },
    { item: 'Vivo', code: 'VIV401', quantity: 100, price: 800000 },
    // Add more items as needed
  ];

  mongoose.connect('mongodb+srv://srinathkadam04:FullStack3000%23@cluster0.fqkluxw.mongodb.net/users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Call the function to seed the database
    seedDatabase();
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

  async function seedDatabase() {
    try {
      // Remove existing data (optional, only if you want to start fresh)
  
      // Insert default items into the database
      await Item.insertMany(defaultItems);
  
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      // Close the database connection (optional)
      mongoose.disconnect();
    }
  }
  
  // Call the function to seed the database