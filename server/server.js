const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB (Replace 'mongodb://localhost:27017/inventory_db' with your database connection string)
mongoose.connect('mongodb+srv://srinathkadam04:FullStack3000%23@cluster0.fqkluxw.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Add routes and middleware here
app.use(bodyParser.json());
app.use(cors());

const inventoryRoutes = require('./routes/inventoryRoutes');
app.use(inventoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

