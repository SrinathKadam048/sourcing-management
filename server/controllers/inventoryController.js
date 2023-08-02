
const Item = require('../models/item');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({error : 'Failed'});
  }
};

module.exports = {
  getAllItems,
};