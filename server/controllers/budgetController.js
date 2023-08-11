const Budget = require('../models/budget');

const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({ company: 'ABC Corp' });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json({ amount: budget.amount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get budget' });
    }
};

module.exports = {
    getBudget,
}