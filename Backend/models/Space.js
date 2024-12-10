const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['hanger', 'shelf'], required: true },
    capacity: { type: Number, required: true },
    occupied: { type: Number, required: true, default: 0 },
    pricePerUnit: { type: Number, required: true },
});

module.exports = mongoose.model('Space', spaceSchema);
