const Space = require('../models/Space');

// Get all spaces
exports.getAllSpaces = async (req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching spaces', error: err });
    }
};

// Create new space
exports.createSpace = async (req, res) => {
    try {
        const { name, type, capacity, occupied, pricePerUnit } = req.body;
        const newSpace = new Space({ name, type, capacity, occupied, pricePerUnit });
        await newSpace.save();
        res.status(201).json(newSpace);
    } catch (err) {
        res.status(400).json({ message: 'Error creating space', error: err });
    }
};

// Update space
exports.updateSpace = async (req, res) => {
    try {
        const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSpace);
    } catch (err) {
        res.status(400).json({ message: 'Error updating space', error: err });
    }
};

// Delete space
exports.deleteSpace = async (req, res) => {
    try {
        await Space.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Space deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting space', error: err });
    }
};
