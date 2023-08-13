const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema({
    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    itemQuantity: { type: Number, required: true },
    itemPrice: { type: Number, required: true },
    costPR: { type: Number, required: true },
    isActionTaken: { type: Boolean, required: true }
});

const purchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema);

module.exports = purchaseRequest;