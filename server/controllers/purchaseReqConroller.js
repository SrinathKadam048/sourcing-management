const PR_model = require('../models/purhaseRequest')

const addPR = async (req, res) => {
    try {
        const { code, name, quantity, price, cost, isAction } = req.body;
        const newPR = new PR_model({
            itemCode: code,
            itemName: name,
            itemQuantity: quantity,
            itemPrice: price,
            costPR: cost,
            isActionTaken: isAction,
        });
        const savedItem = await newPR.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add PR to Budget' });
    }
}

const getAllPRs = async (req, res) => {
    try {
        const PRs = await PR_model.find({ isActionTaken: false });
        res.status(200).json(PRs);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
}

const updatePR = async (req, res) => {
    try {
        const Id = req.params.PR_ID;
        const { isActionTaken } = req.body;
        // Find the item by itemId and update the specified fields
        const updatedItem = await PR_model.findOneAndUpdate(
            { _id: Id },
            { $set: { isActionTaken } },
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
    addPR,
    getAllPRs,
    updatePR,
}