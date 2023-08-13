require('dotenv').config({ path: './config.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB (Replace 'mongodb://localhost:27017/inventory_db' with your database connection string)
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Add routes and middleware here
app.use(bodyParser.json());
app.use(cors());

const inventoryRoutes = require('./server/routes/inventoryRoutes');
app.use(inventoryRoutes);

const budgetRoutes = require('./server/routes/budgetRoutes');
app.use(budgetRoutes);

const prRoutes = require('./server/routes/purchaseReqRoutes');
app.use(prRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

