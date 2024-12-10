const express = require('express');
const {
    getAllSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
} = require('../controllers/spaceController');

const router = express.Router();

router.get('/', getAllSpaces);
router.post('/', createSpace);
router.put('/:id', updateSpace);
router.delete('/:id', deleteSpace);

module.exports = router;
