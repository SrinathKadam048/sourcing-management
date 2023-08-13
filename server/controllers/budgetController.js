const Budget = require('../models/budget');

const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({ company: 'ABCCorp' });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get budget' });
    }
};

const updateBudget = async (req, res) => {
    try {
        const companyName = req.params.company
        const { amount } = req.body;
        const updatedBudget = await Budget.findOneAndUpdate(
            { company: companyName },
            { $set: { amount } },
            { new: true } // Return the updated document
        );

        if (!updatedBudget) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update budget' });
    }
};

module.exports = {
    getBudget,
    updateBudget,
}