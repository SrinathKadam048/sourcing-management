const mongoose = require('mongoose');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  code: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Create the Item model based on the schema
const Item = mongoose.model('Item', itemSchema);

// Export the Item model to be used in other parts of the application
module.exports = Item;