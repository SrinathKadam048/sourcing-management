const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB (Replace 'mongodb://localhost:27017/inventory_db' with your database connection string)
mongoose.connect('mongodb+srv://srinathkadam04:FullStack3000%23@cluster0.fqkluxw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Add routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const inventoryController = require('./controllers/inventoryController');

// Define API routes
app.use('/api/inventory', inventoryController);