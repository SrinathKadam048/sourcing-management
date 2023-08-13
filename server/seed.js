const mongoose = require('mongoose');
const Item = require('./models/purhaseRequest');

const defaultItems = [
  { itemCode: 'IPH101', itemName: 'iPhone', itemQuantity: 60, itemPrice: 500000, costPR: 1000000 },
  // Add more items as needed
];

mongoose.connect(`mongodb+srv://srinathkadam04:FullStack3000%23@cluster0.fqkluxw.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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