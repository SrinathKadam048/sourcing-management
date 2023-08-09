
const Item = require('../models/item');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
};

const checkItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findOne({ code: itemId });

    if (item) {
      // Item ID already exists, send a response indicating it's invalid
      return res.status(200).json({ isValid: false, object: item.item });
    } else {
      // Item ID is valid and doesn't exist in the database
      return res.status(200).json({ isValid: true });
    }
  } catch (error) {
    // Handle any errors that occurred during the database query
    return res.status(500).json({ error: 'Failed to check item ID' });
  }
};

const addItem = async (req, res) => {
  try {
    const { itemId, itemName, itemQuantity, itemPrice } = req.body;

    const newItem = new Item({
      code: itemId,
      item: itemName,
      quantity: itemQuantity,
      price: itemPrice,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to the inventory' });
  }
};

const updateItem = async (req, res) => {
  console.log("Inside UPDATE controller")
  try {
    const itemId = req.params.itemId;
    const { item, price } = req.body;
    console.log(req.body);
    // Find the item by itemId and update the specified fields
    const updatedItem = await Item.findOneAndUpdate(
      { code: itemId },
      { $set: { item, price } },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
}

module.exports = {
  getAllItems,
  checkItem,
  addItem,
  updateItem,
};